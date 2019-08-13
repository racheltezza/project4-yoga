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

    /* Step 5
    *  The render function manages what is shown in the browser
    *  TODO: delete the jsx returned
    *   and replace it with your own custom jsx template
    *
    */
    render() {
        let eventsListsList = this.state.eventsLists.map((list) => {
            return <Link to={`/users/${this.props.match.params.userId}/eventsLists/${list._id}/events`}>{list.name}</Link>
        })
        return (
            this.state.isNewEventsListFormShowing
            ?
            <form>
                <input />
            </form>
            :
            <div>
                {/* Acc}essing the value of message from the state object */}
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
