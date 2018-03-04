import React, { Component } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { AUTH_TOKEN } from '../constants';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  render() {
    return (
      <Form>
        <Form.Field>
          <Input
            icon='user'
            label='Name'
            placeholder='Name...'
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </Form.Field>
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
        <Button type='submit' onClick={() => this._signup()}>Sign Up</Button>
      </Form>
    );
  }

  _signup = async () => {
    const { email, password, name } = this.state;

    const result = await this.props.signUpMutation({
      variables: {
        email,
        password,
        name,
      },
    });

    const token = result.data.signup;
    this._saveUserData(token);
    this.props.history.push('/');
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  }
}

const SIGNUP_MUTATION = gql`
  mutation SignUpMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

export default graphql(SIGNUP_MUTATION, { name: 'signUpMutation'}) (SignUp);