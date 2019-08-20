/* Step 1 import React, { Component } and axios
 *
 */
import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

/* Step 2
 * Rename this class to reflect the component being created
 *
 */
export default class User extends Component {

    /* Step 3
    * Create a state for the component to store view data
    *
    */
    state = {
        user: {},
        isEditUserFormShowing: false,
        redirectToHome: false
    }

    /* Step 4
    * Use componentDidMount to retrieve any data to display
    *   Here you can make calls to your local express server
    *   or to an external API
    *   setState can be run here as well
    *   -REMINDER remember `setState` it is an async function
    */
    componentDidMount() {
        this.getUser()
    }
    
    getUser = () => {
        axios.get(`/api/users/${this.props.match.params.userId}`)
            .then((res) => {
                this.setState({user: res.data})
                console.log(res.data)
            })
    }

    handleInputChange = (event) => {
        const copiedUser = {...this.state.user}
        copiedUser[event.target.name] = event.target.value
        this.setState({user: copiedUser})
    }

    handleEditUserSubmit = (event) => {
        event.preventDefault()
        axios.put(`/api/users/${this.state.user._id}`, this.state.user)
        .then((res) => {
            this.setState({
                user: res.data,
                isEditUserFormShowing: false
            })
        })
    }

    handleToggleEditForm = () => {
        this.setState((state) => {
            return {isEditUserFormShowing: true}
        })
    }

    handleDeleteUser = () => {
        axios.delete(`/api/users/${this.state.user._id}`)
        .then(() => {
            this.setState({redirectToHome: true})
        })
    }

    /* Step 5
    *  The render function manages what is shown in the browser
    *  TODO: delete the jsx returned
    *   and replace it with your own custom jsx template
    *
    */
    render() {
        if(this.state.redirectToHome) {
            return <Redirect to='/' />
        }
        return (
            this.state.isEditUserFormShowing
            ?
            <form>
                <input value={this.state.user.name} />
            </form>
            :
            <div>
                <Link to={`/users/${this.state.user._id}/eventsLists`} className='nav-link-back'>Back to my lists</Link>
                <h1>One User</h1>
                <ul>
                    <li>Name: {this.state.user.name}</li>
                    <li>Username: {this.state.user.userName}</li>
                    <li>Password: {this.state.user.password}</li>
                    <li>City: {this.state.user.city}</li>
                </ul>
                <button onClick={this.handleToggleEditForm}>Edit User</button>
                <button onClick={this.handleDeleteUser}>Delete User</button>
            </div>
        )
    }
}
