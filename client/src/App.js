import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Users from './components/Users.js'
import User from './components/User.js'
import EventsList from './components/EventsList.js'
import Events from './components/Events.js'
import Event from './components/Event.js'
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


function App() {
  return (
    <div className="App">
      <AppBar className="app-bar">
        <Toolbar>
        <Typography variant="h6" color="inherit">
          <span className='navbar-site-title'>AJAR YOGA</span>
          </Typography>
      </Toolbar>
      </AppBar>
      <Router>
        <Switch>
          <Route exact path="/" component={Users}/>
          <Route path="/users/:userId/eventsLists/:listId/events/:eventId" component={Event}/>
          <Route path="/users/:userId/eventsLists/:listId/events" component={Events}/>
          <Route path="/users/:userId/eventsLists" component={EventsList}/>
          <Route path="/users/:userId" component={User}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
