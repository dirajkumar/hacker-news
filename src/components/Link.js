import React, { Component } from 'react';
import { Feed, Icon } from 'semantic-ui-react';

class Link extends Component {
  render() {
    const { url, description, postedBy } = this.props.link;

    return (
      <Feed.Event>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>{ postedBy ? postedBy.name : 'Unknown' }</Feed.User> posted <a>{url}</a>
          <Feed.Date>1 Hour Ago</Feed.Date>
          </Feed.Summary>
          <Feed.Extra text>
            {description}
          </Feed.Extra>
          <Feed.Meta>
            <Feed.Like>
              <Icon name='thumbs up' />
              4 Likes
            </Feed.Like>
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    );
  }
  
  _voteForLink = async () => {

  }
}

export default Link;