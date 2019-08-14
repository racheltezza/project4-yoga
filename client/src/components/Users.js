/* Step 1 import React, { Component } and axios
 *
 */
import React, { Component } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button';

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

    handleInputChange = (event) => {
        const copiedNewUser = {...this.state.newUser}
        copiedNewUser[event.target.name] = event.target.value
        this.setState({newUser: copiedNewUser})
    }

    handleNewUserSubmit = (event) => {
        event.preventDefault()
        axios.post('/api/users', this.state.newUser)
        .then(() => {
            this.setState({ isNewUserFormShowing: false })
            this.getAllUsers()
        })
    }

    handleToggledNewUserForm = () => {
        this.setState((state) => {
            return {isNewUserFormShowing: true}
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
            return <li><a href={`/users/${user._id}/eventsLists`}>{user.name}</a></li>

        })
        return (
            this.state.isNewUserFormShowing
            ?
            <form onSubmit={this.handleNewUserSubmit}>
                <label htmlFor='new-user-name'>Name: </label>
                <input 
                name='name' 
                id='new-user-name' 
                type='text' 
                onChange={this.handleInputChange}
                />
                <label htmlFor='new-user-userName'>Username: </label>
                <input
                name='userName'
                id='new-user-userName'
                type='text'
                onChange={this.handleInputChange}
                />
                <label htmlFor='new-user-password'>Password: </label>
                <input
                name='password'
                id='new-user-password'
                type='text'
                onChange={this.handleInputChange}
                />
                <label htmlFor='new-user-city'>City: </label>
                <input
                name='city'
                id='new-user-city'
                type='text'
                onChange={this.handleInputChange}
                />
                <input
                type='submit'
                value='Create Account'
                />
            </form>
            :
            <div>
                {/* Accessing the value of message from the state object */}
                {/* <h1>{this.state.users}</h1> */}
                <h1>all users</h1>
                <ul>
                {usersList}
                </ul>
                <Button onClick={this.handleToggledNewUserForm} variant="outlined" color="primary">Add User Account</Button>
            </div>
        )
    }
}
