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
import ListIcon from '@material-ui/icons/List';
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
  });

const MyListItem = styled(ListItem) ({
      width: 270,
  });

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

    render() {
        let eventsListsList = this.state.eventsLists.map((list) => {
            return(
                <MyListItem>
                    <ListItemIcon>
                        <ListIcon />
                    </ListItemIcon>
                    <Link to={`/users/${this.props.match.params.userId}/eventsLists/${list._id}/events`}>{list.name}</Link>
                </MyListItem>
            )
        })
        return (
            this.state.isNewEventsListFormShowing
            ?
            <form onSubmit={this.handleSubmitNewListForm}>
                {/* <label htmlFor='new-list-name'>List Name: </label>
                <input onChange={this.handleInputChange} name='name' id='new-list-name'/> */}
                <TextField
                id="standard-uncontrolled"
                label="Yoga List Name"
                // defaultValue="foo"
                name='name'
                margin="normal"
                onChange={this.handleInputChange}
                />
                <input type='submit' value='Add New List'/>
            </form>
            :
                <div>
                    <div className='clearfix'>
                <Link to='/' className="nav-link-back">Back to all users</Link>
                <Link to={`/users/${this.props.match.params.userId}`} className="nav-link-profile"><AccountIcon/></Link>
                </div>
                <h1>My events lists</h1>
                <List className='lists-list'>
                    {eventsListsList}
                </List>
                <MyButton onClick={this.handleToggleNewListForm}>Add New Yoga Event List</MyButton>
                </div>
        )
    }
}
