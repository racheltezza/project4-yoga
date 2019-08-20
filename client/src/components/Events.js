/* Step 1 import React, { Component } and axios
 *
 */
import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EventIcon from '@material-ui/icons/Event'
import { styled } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';

/* Step 2
 * Rename this class to reflect the component being created
 *
 */
let AUTHORIZATION = 'Bearer' + ' ' + process.env.REACT_APP_EVENTBRITE_API_KEY

console.log(AUTHORIZATION)

const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #c684f5 30%, #84e4f5 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(134, 201, 242, .3)',
    color: 'white',
    height: 40,
    padding: '0 30px',
  });

  const DeleteButton = styled(Button)({
    background: 'red',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 40,
    padding: '0 30px',
  });

  const MyListItem = styled(ListItem) ({
      width: 270,
  });


  const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

 export default class Events extends Component {

    /* Step 3
    * Create a state for the component to store view data
    *
    */
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
        error: ""
    }

    /* Step 4
    * Use componentDidMount to retrieve any data to display
    *   Here you can make calls to your local express server
    *   or to an external API
    *   setState can be run here as well
    *   -REMINDER remember `setState` it is an async function
    */
   
   
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
    


    getEventbriteEvents = async (event) => {
        event.preventDefault()
        const city = event.target.elements.city.value;
        const api_call = await fetch(`https://cors-anywhere.herokuapp.com/https://www.eventbriteapi.com/v3/events/search?location.address=${city}&location.within=10km&expand=venue&categories=107&subcategories=7005`, {method: 'GET', headers: {'Authorization': AUTHORIZATION}});
        const data = await api_call.json()
        if(city) {
            console.log(data)
            this.setState({
                eventsSearched: data.events})
            console.log(this.state.eventName)
            console.log(this.state.eventsSearched)
        } else {
            this.setState({error: 'Please enter a city'})
        }
    }
    

    render() {
       
        if(this.state.redirectToEventsList) {
            return <Redirect to={`/users/${this.props.match.params.userId}/eventsLists`} />
        }
        let searchedEventsList = this.state.eventsSearched.map((event) => {
            return (
                <div>
                {/* <img src={event.logo.url} alt="Yoga-Event"/>
                <p>Event: {event.name.text} </p>
                <p>Address: {event.venue.address.address_1}</p>
                <li>Date/Time: {event.start.local}</li>
                <p>{event.description.text}</p> */}
     <Card className='card'>
      <CardHeader
        title={event.name.text}
        subheader={event.start.local}
      />
      <CardMedia
        className='media'
        image={event.logo.url}
        title={event.name.text}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        <p>{event.venue.address.address_1}</p>
        <p>{event.description.text}</p>
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
                <Link to={`/users/${this.props.match.params.userId}/eventsLists/${this.props.match.params.listId}/events/${event._id}`}>{event.name}</Link>
              </MyListItem>
            )
        })
        return (
            this.state.isNewEventFormShowing
            ?
            <form onSubmit={this.handleNewEventSubmit}>
                {/* <label htmlFor='new-event-name'>Event Name: </label>
                <input type='text' name='name' id='new-event-name' onChange={this.handleInputChange}/>
                <label htmlFor='new-event-date'>Event Date: </label>
                <input type='text' name='date' id='new-event-date' onChange={this.handleInputChange}/>
                <label htmlFor='new-event-city'>Event City: </label>
                <input type='text' name='city' id='new-event-city' onChange={this.handleInputChange}/>
                <label htmlFor='new-event-address'>Event Address: </label>
                <input type='text' name='address' id='new-event-address' onChange={this.handleInputChange}/>
                <label htmlFor='new-event-description'>Event Description: </label>
                <input type='text' name='description' id='new-event-description' onChange={this.handleInputChange}/> */}
                <TextField
                id="standard-uncontrolled"
                label="Event Name"
                // defaultValue="foo"
                name='name'
                margin="normal"
                onChange={this.handleInputChange}
                />
                <TextField
                id="standard-uncontrolled"
                label="Event Date"
                // defaultValue="foo"
                name='date'
                margin="normal"
                onChange={this.handleInputChange}
                />
                <TextField
                id="standard-uncontrolled"
                label="Event City"
                // defaultValue="foo"
                name='city'
                margin="normal"
                onChange={this.handleInputChange}
                />
                <TextField
                id="standard-uncontrolled"
                label="Event Address"
                // defaultValue="foo"
                name='address'
                margin="normal"
                onChange={this.handleInputChange}
                />
                <TextField
                id="standard-uncontrolled"
                label="Event Description"
                // defaultValue="foo"
                name='description'
                margin="normal"
                onChange={this.handleInputChange}
                />
                <input type='submit' value='Add Event' />
            </form>
            :
            <div>
                {/* Accessing the value of message from the state object */}
                <Link to={`/users/${this.props.match.params.userId}/eventsLists/`} className="nav-link-back">Back to all Lists</Link>
                <h1>One List{this.state.name}</h1>
                <div>
                <MyButton onClick={this.handleToggleNewEventForm}>Add New Event</MyButton>
                <DeleteButton onClick={this.handleDeleteEventsList}>Delete this List</DeleteButton>
                </div>
                <List className='lists-list'>
                {eventsList}
                </List>
                {/* <Button onClick={this.handleToggleNewEventForm} variant="outlined" color="primary">Add New Event</Button> */}

                <form onSubmit={this.getEventbriteEvents}>
                    <label htmlFor='city-search'>Browse events by city:</label>
                    <input id='city-search' type='text' placeholder='city...' name='city' />
                    {/* <TextField
                        id="outlined-name"
                        label="City"
                        name='city'
                        margin="normal"
                        variant="outlined"
                    /> */}
                    <button>Search</button>
                </form>
                <div className='search-items'>
                    {searchedEventsList}
                </div>
                <p>{this.state.error}</p>
            </div>
        )
    }
}
