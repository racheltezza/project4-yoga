/* Step 1 import React, { Component } and axios
 *
 */
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountIcon from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import { styled } from '@material-ui/styles';
/* Step 2
 * Rename this class to reflect the component being created
 *
 */

const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #c684f5 30%, #84e4f5 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(134, 201, 242, .3)',
    color: 'white',
    height: 40,
    padding: '0 30px',
    margin: '30px'
  });

const MyListItem = styled(ListItem) ({
    width: 270,
});


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
            return(         
            <MyListItem>
            <ListItemIcon>
              <AccountIcon />
            </ListItemIcon>
            <Link to={`/users/${user._id}/eventsLists`}>{user.name}</Link>
          </MyListItem>
            )

        })
        return (
            this.state.isNewUserFormShowing
            ?
            <form onSubmit={this.handleNewUserSubmit}>
                {/* <label htmlFor='new-user-name'>Name: </label> */}
                {/* <input 
                name='name' 
                id='new-user-name' 
                type='text' 
                onChange={this.handleInputChange}
                /> */}
                <TextField
                id="standard-uncontrolled"
                label="Name"
                // defaultValue="foo"
                name='name'
                margin="normal"
                onChange={this.handleInputChange}
                />
                <TextField
                id="standard-uncontrolled"
                label="Username"
                // defaultValue="foo"
                name='userName'
                margin="normal"
                onChange={this.handleInputChange}
                />
                <TextField
                id="standard-uncontrolled"
                label="Password"
                // defaultValue="foo"
                name='password'
                margin="normal"
                onChange={this.handleInputChange}
                />
                <TextField
                id="standard-uncontrolled"
                label="City"
                // defaultValue="foo"
                name='city'
                margin="normal"
                onChange={this.handleInputChange}
                />
                {/* <label htmlFor='new-user-userName'>Username: </label>
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
                /> */}
                <input
                type='submit'
                value='Create Account'
                className='new-list-input'
                />
            </form>
            :
            <div>
                {/* <h1 className='page-logo'>AJAR</h1> */}
                <MyButton className='add-new-user' onClick={this.handleToggledNewUserForm} variant="outlined" color="primary">Add User Account</MyButton>
              <List>
                  {usersList}
              </List>
            </div>
        )
    }
}
