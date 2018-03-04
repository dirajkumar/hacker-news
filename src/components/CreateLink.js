import React, { Component } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class CreateLink extends Component {
  state = {
    description: '',
    url: ''
  };

  _createLink = async () => {
    const { description, url } = this.state;
    await this.props.postMutation({
      variables: {
        description,
        url
      }
    });
    this.props.history.push('/');
  }

  render() {
    return (
      <Form>
        <Form.Field>
          <Input 
          icon='user' 
          label='Description' 
          placeholder='Descrption...' 
          value={this.state.description}
          onChange={e => this.setState({ description: e.target.value })}
          />
        </Form.Field>
        <Form.Field>
          <Input 
          icon='user' 
          label='URL' 
          placeholder='Url...' 
          value={this.state.url}
          onChange={e => this.setState({ url: e.target.value })}
          />
        </Form.Field>
        <Button type='submit' loading={this.props.postMutation.loading} onClick={() => this._createLink()} >Submit</Button>
      </Form>
    );
  }
}

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!){
    post(description: $description, url: $url){
      id,
      createdAt,
      url,
      description
    }
  }
`;

export default graphql( POST_MUTATION, { name: 'postMutation' })(CreateLink);