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

/* Step 2
 * Rename this class to reflect the component being created
 *
 */
let AUTH_TOK = 'XIHEXMGEIERWI6VZFO'

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
        redirectToEventsList: false
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
    


    getEventbriteEvents = async (e) => {
        e.preventDefault()
        const city = e.target.elements.city.value;
        const api_call = await fetch(`https://www.eventbriteapi.com/v3/users/me/?token=J6ZSGEZUCIGAIE5CIOIH`);
        const data = await api_call.json()
        console.log(data)
    }

    /* Step 5
    *  The render function manages what is shown in the browser
    *  TODO: delete the jsx returned
    *   and replace it with your own custom jsx template
    *
    */
    render() {
        if(this.state.redirectToEventsList) {
            return <Redirect to={`/users/${this.props.match.params.userId}/eventsLists`} />
        }
        let eventsList = this.state.events.map((event) => {
            return (
                <ListItem>
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <Link to={`/users/${this.props.match.params.userId}/eventsLists/${this.props.match.params.listId}/events/${event._id}`}>{event.name}</Link>
              </ListItem>
            )
        })
        return (
            this.state.isNewEventFormShowing
            ?
            <form onSubmit={this.handleNewEventSubmit}>
                <label htmlFor='new-event-name'>Event Name: </label>
                <input type='text' name='name' id='new-event-name' onChange={this.handleInputChange}/>
                <label htmlFor='new-event-date'>Event Date: </label>
                <input type='text' name='date' id='new-event-date' onChange={this.handleInputChange}/>
                <label htmlFor='new-event-city'>Event City: </label>
                <input type='text' name='city' id='new-event-city' onChange={this.handleInputChange}/>
                <label htmlFor='new-event-address'>Event Address: </label>
                <input type='text' name='address' id='new-event-address' onChange={this.handleInputChange}/>
                <label htmlFor='new-event-description'>Event Description: </label>
                <input type='text' name='description' id='new-event-description' onChange={this.handleInputChange}/>
                <input type='submit' value='Add Event' />
            </form>
            :
            <div>
                {/* Accessing the value of message from the state object */}
                <Link to={`/users/${this.props.match.params.userId}/eventsLists/`}>Back to all Lists</Link>
                <h1>One List</h1>
                <List>
                {eventsList}
                </List>
                <Button onClick={this.handleToggleNewEventForm} variant="outlined" color="primary">Add New Event</Button>
                <Button onClick={this.handleDeleteEventsList} variant="outlined" color="primary">Delete this List</Button>

                <form onSubmit={this.getEventbriteEvents}>
                    <input type='text' placeholder='city...' name='city' />
                    <button>Search</button>
                </form>
            </div>
        )
    }
}
