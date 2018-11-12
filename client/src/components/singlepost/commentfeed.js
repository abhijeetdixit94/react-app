import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Commentitem from './commentitem';

class Commentfeed extends Component {
  render() {

    const { postid, comments } = this.props;

        return (
            comments.map(comment => <Commentitem key={comment._id} comment={comment} postid={postid} />)
        );
    }
}

Commentfeed.propTypes = {
    comments: PropTypes.array.isRequired,
    postid: PropTypes.string.isRequired
}

export default Commentfeed;