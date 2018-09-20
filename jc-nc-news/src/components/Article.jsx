import React, { Component } from 'react';
import * as api from './api'
import '../CSS/Article.css'
import moment from 'moment'

class Article extends Component {
  state = {
    article: [],
    comments: [],
    newComment: '',
    changeArticleVotes: 0
  }

  componentDidMount() {
    this.retriveArticleAndComments()
  }

  retriveArticleAndComments = async () => {
    const article = await api.retriveArticleById(this.props.match.params)
    const comments = await api.retriveCommentsByArticle(this.props.match.params)
    let sortedComments = this.sortComments(comments)
    this.setState({
      article: [article.data.articles],
      comments: sortedComments
    });
  }

  render() {
    return (
      <div>
        {this.state.article.length > 0 &&
          <div>
            <div className='thisArticle'>
              <h2>{this.state.article[0].title}</h2>
              <p>{this.state.article[0].belongs_to}: {this.state.article[0].body}</p>
              <p>Votes: {this.state.article[0].votes + this.state.changeArticleVotes}</p>
              <button disabled={this.state.changeArticleVotes !== 0} className='UPVoteButton' key={`${this.state.article[0]._id}UP`} onClick={() => this.handleVoteClick(this.state.article[0]._id, 'UP')}>Up</button>
              <button disabled={this.state.changeArticleVotes !== 0} className='DOWNVoteButton' key={`${this.state.article[0]._id}DOWN`} onClick={() => this.handleVoteClick(this.state.article[0]._id, 'DOWN')}>Down</button>
            </div>

            <p>Add Comment: </p>
            <form onSubmit={this.handleSubmit}>
              <textarea rows='5' value={this.state.newComment} onChange={this.handleInput} />
              <br />
              <button>Post</button>
            </form>
            <div className='articlePage'>Comments: {this.state.comments.map(comment => {
              return <div className='comment' key={comment._id}>
                <p>Comment: {comment.body}</p>
                <p>Posted: {moment(comment.created_at).fromNow()}</p>
                <p>Votes: {comment.votes}</p>
                <p>Created by: {comment.created_by}</p>
                <div >
                  <button onClick={this.handleClick} value={comment._id}>Up</button>
                  <button onClick={this.handleClick} value={comment._id}>Down</button>
                  {console.log(comment.created_by)}
                  {/* disabled={this.props.currentUser !== comment.created_by} */}
                  <button className='DeleteArticle' onClick={() => this.handleDelete(comment._id)}>Delete</button>
                </div>
              </div>
            })}</div>
          </div>
        }
      </div>
    );
  }

  handleClick = async (e) => {
    await api.updateVotesComment(e.target.value, e.target.innerText)
  }

  handleVoteClick = (id, direction) => {
    api.updateVotesArticle(id, direction)
    let vote = direction === 'UP' ? 1 : direction === 'DOWN' ? -1 : 0
    this.setState({
      changeArticleVotes: vote
    })
  }

  handleInput = (event) => {
    this.setState({ newComment: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.newComment !== '') {
      const user = await api.retriveProfile(this.props)
      const latestComment = await api.addNewComment(this.state.newComment, this.state.article[0]._id, user.data.user._id);
      const updatedComments = [latestComment.data.comment].concat(this.state.comments);
      this.setState({
        newComment: '',
        comments: updatedComments
      })
    } else {
      alert('Cannot enter an empty comment...')
    }
  }

  sortComments = (comments) => {
    return comments.data.comments.sort((a, b) => {
      return moment(b.created_at).valueOf() - moment(a.created_at).valueOf()
    })
  }

  handleDelete = async (commentId) => {
    await api.deleteComment(commentId)
    const newcomments = this.state.comments.filter(comment => comment._id !== commentId)
    this.setState({
      comments: newcomments
    })
  }
}

export default Article;