/* Step 1 import React, { Component } and axios
 *
 */
import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

/* Step 2
 * Rename this class to reflect the component being created
 *
 */
export default class Event extends Component {

    /* Step 3
    * Create a state for the component to store view data
    *
    */
    state = {
        event: {},
        isEditEventFormDisplayed: false,
        redirectToEventsList: false
    }

    componentDidMount() {
        this.getOneEvent()
    }
    
    getOneEvent = () => {
        axios.get(`/api/users/${this.props.match.params.userId}/eventsLists/${this.props.match.params.listId}/events/${this.props.match.params.eventId}`)
            .then((res) => {
                this.setState({event: res.data})
            })
    }

    handleDeleteEvent = () => {
        axios.delete(`/api/users/${this.props.match.params.userId}/eventsLists/${this.props.match.params.listId}/events/${this.props.match.params.eventId}`)
        .then(() => {
            this.setState({redirectToEventsList: true})
        })
    }

    handleInputChange = (event) => {
        let copiedEvent = {...this.state.event}
        copiedEvent[event.target.name] = event.target.value
        this.setState({event: copiedEvent})
    }

    handleEditEventSubmit = (event) => {
        event.preventDefault()
        axios.put(`/api/users/${this.props.match.params.userId}/eventsLists/${this.props.match.params.listId}/events/${this.props.match.params.eventId}`, this.state.event)
        .then((res) => {
            this.setState({
                event: res.data,
                isEditEventFormDisplayed: false
            })
        })
    }

    handleToggleEditEventForm = () => {
        this.setState({isEditEventFormDisplayed: true})
    }

    render() {
        if(this.state.redirectToEventsList) {
            return <Redirect to={`/users/${this.props.match.params.userId}/eventsLists/${this.props.match.params.listId}/events/`} />
        }
        return (
            this.state.isEditEventFormDisplayed
            ?
            <form onSubmit={this.handleEditEventSubmit}>
                {/* <label htmlFor='event-name'>Event Name: </label>
                <input 
                type='text' 
                id='event-name' 
                name ='name' 
                onChange={this.handleInputChange} 
                value={this.state.event.name}
                />
                <label htmlFor='event-city'>Event City: </label>
                <input 
                type='text' 
                id='event-city' 
                name ='city' 
                onChange={this.handleInputChange} 
                value={this.state.event.city}
                />
                <label htmlFor='event-address'>Event Address: </label>
                <input 
                type='text' 
                id='event-address' 
                name ='address' 
                onChange={this.handleInputChange} 
                value={this.state.event.address}
                />
                <label htmlFor='event-date'>Event Date: </label>
                <input 
                type='text' 
                id='event-date' 
                name ='date' 
                onChange={this.handleInputChange} 
                value={this.state.event.date}
                />
                <label htmlFor='event-description'>Event Description: </label>
                <input 
                type='text' 
                id='event-description' 
                name ='description' 
                onChange={this.handleInputChange} 
                value={this.state.event.description}
                /> */}
                <TextField
                id="standard-uncontrolled"
                label="Event Name"
                defaultValue={this.state.event.name}
                name='name'
                margin="normal"
                onChange={this.handleInputChange}
                />
                <TextField
                id="standard-uncontrolled"
                label="Event Date"
                defaultValue={this.state.event.date}
                name='date'
                margin="normal"
                onChange={this.handleInputChange}
                />
                <TextField
                id="standard-uncontrolled"
                label="Event City"
                defaultValue={this.state.event.city}
                name='city'
                margin="normal"
                onChange={this.handleInputChange}
                />
                <TextField
                id="standard-uncontrolled"
                label="Event Address"
                defaultValue={this.state.event.address}
                name='address'
                margin="normal"
                onChange={this.handleInputChange}
                />
                <TextField
                id="standard-uncontrolled"
                label="Event Description"
                defaultValue={this.state.event.description}
                name='description'
                margin="normal"
                onChange={this.handleInputChange}
                />
                <input type='submit' value='update event' />
            </form>
            :
            <div>
                <Link to={`/users/${this.props.match.params.userId}/eventsLists/${this.props.match.params.listId}/events`} className="nav-link-back">Back to All events</Link>
    
                <Card className='card'>
                    <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                    {this.state.event.date}
                    </Typography>
                    <Typography variant="h5" component="h2">
                    {this.state.event.name}
                    </Typography>
                    <Typography color="textSecondary">
                    {this.state.event.address}
                    </Typography>
                    <Typography variant="body2" component="p">
                        <br />
                        {this.state.event.description}
                    </Typography>
                    </CardContent>
                    <CardActions>
                            <Button size="small" onClick={this.handleToggleEditEventForm}>Edit Event</Button>
                            <Button size="small" onClick={this.handleDeleteEvent}>Delete Event</Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}
