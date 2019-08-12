/* Step 1 import React, { Component } and axios
 *
 */
import React, { Component } from 'react'
import axios from 'axios'

/* Step 2
 * Rename this class to reflect the component being created
 *
 */
export default class Users extends Component {

    /* Step 3
    * Create a state for the component to store view data
    *
    */
    state = {
        users: [],
        newUser: {
            name: "",
            userName: "",
            password: "",
            city: ""
        },
        isNewUserFormShowing: false
    }

    /* Step 4
    * Use componentDidMount to retrieve any data to display
    *   Here you can make calls to your local express server
    *   or to an external API
    *   setState can be run here as well
    *   -REMINDER remember `setState` it is an async function
    */
    componentDidMount() {
        this.getAllUsers()
    }
    
    getAllUsers = () => {
        axios.get('/api/users')
            .then((res) => {
                this.setState({users: res.data})
            })
    }

    /* Step 5
    *  The render function manages what is shown in the browser
    *  TODO: delete the jsx returned
    *   and replace it with your own custom jsx template
    *
    */
    render() {
        let usersList = this.state.users.map((user) => {
            return user.name

        })
        return (
            <div>
                {/* Accessing the value of message from the state object */}
                {/* <h1>{this.state.users}</h1> */}
                <h1>all users</h1>
                {usersList}
            </div>
        )
    }
}
