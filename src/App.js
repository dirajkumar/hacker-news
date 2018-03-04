import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { Switch, Route } from 'react-router';

import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import LinkList from './components/LinkList';
import CreateLink from './components/CreateLink';
import Login from './components/Login';
import SignUp from './components/SignUp';

class App extends Component {
  render() {
    return (
      <div>
      <Header />
      <Segment>
        <Switch>
          <Route exact path='/' component={LinkList} />
          <Route exact path='/create' component={CreateLink} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
        </Switch>
      </Segment>
      </div>
    );
  }
}

export default App;
