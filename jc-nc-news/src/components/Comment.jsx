import React, { Component } from 'react';
import * as api from './api'
import moment from 'moment';
import PropTypes from 'prop-types';

class Comment extends Component {
  state = {
    changeCommentVotes: 0
  }
  render() {
    return (
      <div className='comment' key={this.props.comment._id}>
        <p>Comment: {this.props.comment.body}</p>
        <p>Posted: {moment(this.props.comment.created_at).fromNow()}</p>
        <p>Votes: {this.props.comment.votes + this.state.changeCommentVotes}</p>
        <p>Created by: {this.props.comment.created_by}</p>
        <div >
          <button disabled={this.state.changeCommentVotes !== 0} className='UPVoteButton' onClick={() => this.handleVoteClick(this.props.comment._id, 'UP')} >Up</button>
          <button disabled={this.state.changeCommentVotes !== 0} className='DOWNVoteButton' onClick={() => this.handleVoteClick(this.props.comment._id, 'DOWN')} >Down</button>
          {console.log(this.props.comment.created_by)}
          {/* disabled={this.props.currentUser !== comment.created_by} */}
          <button className='DeleteArticle' onClick={() => this.props.handleDelete(this.props.comment._id)}>Delete</button>
        </div>
      </div>
    );
  }

  handleVoteClick = (id, direction) => {
    api.updateVotesComment(id, direction)
    let vote = direction === 'UP' ? 1 : direction === 'DOWN' ? -1 : 0
    this.setState({
      changeCommentVotes: vote
    })
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  article_id: PropTypes.string.isRequired
}

export default Comment;