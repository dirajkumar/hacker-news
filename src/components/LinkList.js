import React, { Component } from 'react';
import { Feed } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Link from './Link';

class LinkList extends Component {
  render() {
    if (this.props.feedQuery && this.props.feedQuery.loading) {
      return <div>Loading</div>
    }
    
    if (this.props.feedQuery && this.props.feedQuery.error) {
      return <div>Error</div>
    }

    const linksToRender = this.props.feedQuery.feed.links
    return (
      <Feed> 
        {linksToRender.map(link => <Link key={link.id} link={link} updateStoreAfterVote={this._updateCacheAfterVote} />)} 
      </Feed>
    );
  }

  _updateStoreAfterVote = (store, createVote, linkId) => {
    const data = store.readQuery({ query: FEED_QUERY });

    const voteLink = data.feed.links.find(link => link.Id === linkId);
    voteLink.votes = createVote.link.votes;

    store.writeQuery({ query: FEED_QUERY, data });
  } 
}

export const FEED_QUERY = gql`
  query FeedQuery {
    feed {
      links {
        id
        createdAt
        url
        description
        postedBy {
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

export default graphql(FEED_QUERY, { name: 'feedQuery' })(LinkList);