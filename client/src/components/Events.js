
import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EventIcon from '@material-ui/icons/Event'
import { styled } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import YogaImage from '../yoga.jpg'

let AUTHORIZATION = 'Bearer' + ' ' + process.env.REACT_APP_EVENTBRITE_API_KEY


const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #c684f5 30%, #84e4f5 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(134, 201, 242, .3)',
    color: 'white',
    height: 40,
    padding: '0 30px',
    margin: '15px',
  });

  const DeleteButton = styled(Button)({
    background: 'red',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 30,
    padding: '0 20px',
    margin: '15px',
  });

  const MyListItem = styled(ListItem) ({
      width: 270,
  });

 export default class Events extends Component {

    state = {
        events: [],
        newEvent: {
            name: "",
            city: "",
            address: "",
            date: "",
            description: ""
        },
        isNewEventFormShowing: false,
        redirectToEventsList: false,
        eventsSearched: [],
        error: "",
        expansionActive: false,
    }

    componentDidMount() {
        this.getAllEvents()
    }
    
    getAllEvents = () => {
        axios.get(`/api/users/${this.props.match.params.userId}/eventsLists/${this.props.match.params.listId}/events`)
            .then((res) => {
                this.setState({events: res.data})
            })
    }

    handleDeleteEventsList = () => {
        axios.delete(`/api/users/${this.props.match.params.userId}/eventsLists/${this.props.match.params.listId}`)
        .then(() => {
            this.setState({redirectToEventsList: true})
        })
    }

    handleInputChange = (event) => {
        let copiedNewEvent = {...this.state.newEvent}
        copiedNewEvent[event.target.name] = event.target.value
        this.setState({newEvent: copiedNewEvent})
    }

    handleNewEventSubmit = (event) => {
        event.preventDefault()
        axios.post(`/api/users/${this.props.match.params.userId}/eventsLists/${this.props.match.params.listId}/events`, this.state.newEvent)
        .then(() => {
            this.setState({isNewEventFormShowing: false})
            this.getAllEvents()
        })
    }

    handleToggleNewEventForm = () => {
        this.setState((state) => {
          return {isNewEventFormShowing: true}
        })
    }
    

    // create Eventbrite external API call
    getEventbriteEvents = async (event) => {
        event.preventDefault()
        const city = event.target.elements.city.value;
        const api_call = await fetch(`https://cors-anywhere.herokuapp.com/https://www.eventbriteapi.com/v3/events/search?location.address=${city}&location.within=10km&expand=venue&categories=107&subcategories=7005`, {method: 'GET', headers: {'Authorization': AUTHORIZATION}});
        const data = await api_call.json()
        console.log(data)
        if(city) {
            this.setState({
                eventsSearched: data.events
                });

        } else {
            this.setState({error: 'Please enter a city'})
        }
    }

    // expandEventbriteEventDescription = () => {
    //     this.setState({expansionActive: !expansionActive})
    // }

    handleNewEventbriteEvent = (newEventbriteEvent) => {
        let newEventTwo = {
            name: newEventbriteEvent.name.text,
            city: newEventbriteEvent.venue.address.city,
            address: newEventbriteEvent.venue.address.address_1,
            date: newEventbriteEvent.start.local,
            description: newEventbriteEvent.description.text
        }
        axios.post(`/api/users/${this.props.match.params.userId}/eventsLists/${this.props.match.params.listId}/events`, newEventTwo)
        .then(() => {
            this.setState({isNewEventFormShowing: false})
            this.getAllEvents()
        })
    }
    
    render() {
       
        if(this.state.redirectToEventsList) {
            return <Redirect to={`/users/${this.props.match.params.userId}/eventsLists`} />
        }
        let searchedEventsList = this.state.eventsSearched.map((yogaEvent) => {
            return (
                <div>
                    <Card className='eventbrite-card'>
                        <button onClick={() => this.handleNewEventbriteEvent(yogaEvent)} className='add-eventbrite-button'>+</button>
                    <CardHeader
                        title={yogaEvent.name.text}
                        subheader={yogaEvent.start.local} 
                    />
                    <CardMedia
                        className='media'
                        image={yogaEvent.logo===null ? YogaImage : yogaEvent.logo.url}
                        title={yogaEvent.name.text.substring(0, 20)}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                        <p>{yogaEvent.venue.address.address_1}</p>
                        <p>{yogaEvent.description.text ? yogaEvent.description.text.substring(0, 100) + "..." : ''}</p>
                        </Typography>
                    </CardContent>
                    </Card>
                </div>
            )
        })
        let eventsList = this.state.events.map((event) => {
            return (
                <MyListItem className='event-list-item'>
                    <ListItemIcon>
                        <EventIcon />
                    </ListItemIcon>
                    <Link to={`/users/${this.props.match.params.userId}/eventsLists/${this.props.match.params.listId}/events/${event._id}`}>{event.name ? event.name : 'new event'}</Link>
                </MyListItem>
            )
        })
        return (
            this.state.isNewEventFormShowing
            ?
            <form onSubmit={this.handleNewEventSubmit}>
                <TextField
                id="standard-uncontrolled"
                label="Event Name"
                name='name'
                margin="normal"
                onChange={this.handleInputChange}
                />
                <TextField
                id="standard-uncontrolled"
                label="Event Date"
                name='date'
                margin="normal"
                onChange={this.handleInputChange}
                />
                <TextField
                id="standard-uncontrolled"
                label="Event City"
                name='city'
                margin="normal"
                onChange={this.handleInputChange}
                />
                <TextField
                id="standard-uncontrolled"
                label="Event Address"
                name='address'
                margin="normal"
                onChange={this.handleInputChange}
                />
                <TextField
                id="standard-uncontrolled"
                label="Event Description"
                name='description'
                margin="normal"
                onChange={this.handleInputChange}
                />
                <input type='submit' value='Add Event' className='new-list-input'/>
            </form>
            :
            <div>
                <div className='clearfix'>
                <Link to={`/users/${this.props.match.params.userId}/eventsLists/`} className="nav-link-back">Back to all Lists</Link>
                <DeleteButton onClick={this.handleDeleteEventsList}>Delete this List</DeleteButton>

                </div>
                <h1>One List{this.state.name}</h1>
                <div className='list-action-button'>
                    <MyButton onClick={this.handleToggleNewEventForm}>Add New Event</MyButton>
                </div>
                <List className='lists-list'>
                    {eventsList}
                </List>
                <h2>OR</h2>
                <div className='event-search'>
                    <h4 className='seach-label'>Browse Yoga events by city:</h4>
                    <form onSubmit={this.getEventbriteEvents}>
                        <TextField
                            id="outlined-name"
                            label="City"
                            name='city'
                            margin="normal"
                            variant="outlined"
                            className='search-input'
                        />
                    <input type='submit' value="Search" className='search-input'/>
                    </form>
                </div>
                <div className='search-items'>
                    {searchedEventsList}
                </div>
                <p>{this.state.error}</p>
            </div>
        )
    }
}
