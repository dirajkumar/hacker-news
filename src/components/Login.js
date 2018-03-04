import React, { Component } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { AUTH_TOKEN } from '../constants';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  render() {
    return (
      <Form>
        <Form.Field>
          <Input
            icon='user'
            label='Email'
            placeholder='Email...'
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
        </Form.Field>
        <Form.Field>
          <Input
            icon='user'
            label='Password'
            placeholder='Password...'
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
        </Form.Field>
        <Button type='submit' onClick={ () => this._login() }>Log In</Button>
      </Form>
    );
  }

  _login = async () => {
    const { email, password } = this.state;

    const result = await this.props.loginMutation({
      variables: {
        email,
        password,
      },
    });

    const { token } = result.data.login;
    this._saveUserData(token);
    this.props.history.push('/');
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  }
}

const LOGIN_MUTATION = gql`
  mutation LogInMutation($email: String!, $password: String!) {
    login(email: $email, password: $password){
      token
    }
  }
`;

export default graphql(LOGIN_MUTATION, { name : 'loginMutation' }) (Login);