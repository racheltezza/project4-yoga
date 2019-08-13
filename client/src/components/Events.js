/* Step 1 import React, { Component } and axios
 *
 */
import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

/* Step 2
 * Rename this class to reflect the component being created
 *
 */
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
            return <Link to={`/users/${this.props.match.params.userId}/eventsLists/${this.props.match.params.listId}/events/${event._id}`}>{event.name}</Link>
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
                {eventsList}
                <button onClick={this.handleToggleNewEventForm}>Add New Event</button>
                <button onClick={this.handleDeleteEventsList}>Delete this List</button>
            </div>
        )
    }
}
