import React, { Component } from 'react';
import { Feed, Icon, Button, Label } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { timeDifferenceForDate } from '../utils';

class Link extends Component {
  render() {
    const {
      url,
      description,
      postedBy,
      votes,
      createdAt
    } = this.props.link;

    return (
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>{ postedBy ? postedBy.name : 'Unknown' }</Feed.User> posted {url}
            <Feed.Date>{ timeDifferenceForDate(createdAt) }</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>
            {description}
          </Feed.Extra>
          <Feed.Meta>
            <Feed.Like>
              <Button as='div' labelPosition='right' onClick = { () => this._voteForLink() }>
                <Button icon>
                <Icon name='thumbs up' />
                </Button>
                <Label basic pointing='left'>{votes ? votes.length : 0} votes</Label>
              </Button>
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    );
  }
  
  _voteForLink = async () => {
    const linkId = this.props.link.id;
    const updateStoreAfterVote = this.props.updateStoreAfterVote;
    await this.props.voteMutation({
      variables: {
        linkId,
      }, 
      update: (store, { data: { vote } }) => {
        updateStoreAfterVote(store, vote, linkId);
      }
    });
  }
}

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`

export default graphql(VOTE_MUTATION, {
  name: 'voteMutation',
})(Link)