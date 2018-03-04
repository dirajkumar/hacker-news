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
        {linksToRender.map(link => <Link key={link.id} link={link} />)} 
      </Feed>
    );
  }
}

const FEED_QUERY = gql`
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
      }
    }
  }
`;

export default graphql(FEED_QUERY, { name: 'feedQuery' })(LinkList);