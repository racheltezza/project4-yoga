/* Step 1 import React, { Component } and axios
 *
 */
import React, { Component } from 'react'
import axios from 'axios'

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
        axios.get(`/api/users/${this.props.match.params.userId}/eventsLists/${this.props.match.params.listId}`)
            .then((res) => {
                this.setState({events: res.data})
            })
    }

    /* Step 5
    *  The render function manages what is shown in the browser
    *  TODO: delete the jsx returned
    *   and replace it with your own custom jsx template
    *
    */
    render() {
        return (
            <div>
                {/* Accessing the value of message from the state object */}
                <h1>One List</h1>
            </div>
        )
    }
}
