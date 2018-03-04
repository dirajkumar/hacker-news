import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Menu, Segment } from 'semantic-ui-react';

import { AUTH_TOKEN } from '../constants';

class Header extends Component {
  state = { open: false };
  
  show = () => () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);

    return(
      <Menu pointing secondary>
        <Menu.Item name='home' onClick={ () => this.props.history.push('/')}/>
        { authToken && 
          <Menu.Item name='create' onClick={() => this.props.history.push('/create')}/>
        }
       
        { !authToken && (
        <Menu.Menu position='right'>
            <Menu.Item name='login' onClick={() => this.props.history.push('/login')} />
            <Menu.Item name='signup' onClick={() => this.props.history.push('/signup')} />
        </Menu.Menu>
        )}

        { authToken &&
          <Menu.Menu position='right'>
          <Menu.Item name='logout' onClick={() => { 
            localStorage.removeItem(AUTH_TOKEN)
            this.props.history.push('/')
          }} 
          />
          </Menu.Menu>
        }
      </Menu>
    );
  }
}

export default withRouter(Header);