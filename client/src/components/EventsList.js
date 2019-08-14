/* Step 1 import React, { Component } and axios
 *
 */
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

/* Step 2
 * Rename this class to reflect the component being created
 *
 */
export default class EventsList extends Component {

    /* Step 3
    * Create a state for the component to store view data
    *
    */
    state = {
        eventsLists: [],
        newEventsList: {
            name: ""
        },
        isNewEventsListFormShowing: false
    }

    /* Step 4
    * Use componentDidMount to retrieve any data to display
    *   Here you can make calls to your local express server
    *   or to an external API
    *   setState can be run here as well
    *   -REMINDER remember `setState` it is an async function
    */
    componentDidMount() {
        this.getAllEventsLists()
    }
    
    getAllEventsLists = () => {
        axios.get(`/api/users/${this.props.match.params.userId}/eventsLists`)
            .then((res) => {
                this.setState({eventsLists: res.data})
            })
    }

    handleToggleNewListForm = () => {
        this.setState((state) => {
            return {isNewEventsListFormShowing: true}
        })
    }

    handleInputChange = (event) => {
        let copiedNewEventsList = {...this.state.newEventsList}
        copiedNewEventsList[event.target.name] = event.target.value
        this.setState({newEventsList: copiedNewEventsList})
    }

    handleSubmitNewListForm = (event) => {
        event.preventDefault()
        axios.post(`/api/users/${this.props.match.params.userId}/eventsLists`, this.state.newEventsList)
        .then(() => {
            this.setState({isNewEventsListFormShowing: false})
            this.getAllEventsLists()
        })
    }

    /* Step 5
    *  The render function manages what is shown in the browser
    *  TODO: delete the jsx returned
    *   and replace it with your own custom jsx template
    *
    */
    render() {
        let eventsListsList = this.state.eventsLists.map((list) => {
            return <li>
                    <Link to={`/users/${this.props.match.params.userId}/eventsLists/${list._id}/events`}>{list.name}</Link>
                </li>
        })
        return (
            this.state.isNewEventsListFormShowing
            ?
            <form onSubmit={this.handleSubmitNewListForm}>
                <label htmlFor='new-list-name'>List Name: </label>
                <input onChange={this.handleInputChange} name='name' id='new-list-name'/>
                <input type='submit' value='Add New List'/>
            </form>
            :
            <div>
                {/* Acc}essing the value of message from the state object */}
                <Link to='/'>Back to all users</Link>
                <Link to={`/users/${this.props.match.params.userId}`}>View Profile Info</Link>
                <h1>My events lists</h1>
                <ul>
                    {eventsListsList}
                </ul>
                <button onClick={this.handleToggleNewListForm}>Add New Yoga Event List</button>
            </div>
        )
    }
}
