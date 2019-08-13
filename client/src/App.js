import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Users from './components/Users.js'
import User from './components/User.js'
import EventsList from './components/EventsList.js'
import Events from './components/Events.js'
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Users}/>
          <Route path="/users/:userId/eventsLists/:listId/events" component={Events}/>
          <Route path="/users/:userId/eventsLists" component={EventsList}/>
          <Route path="/users/:userId" component={User}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
