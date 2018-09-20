import React, { Component } from 'react';
import * as api from './api'
import '../CSS/Article.css'
import moment from 'moment'

class Article extends Component {
  state = {
    article: [],
    comments: [],
    newComment: '',
    currentUser: ''
  }

  componentDidMount() {
    this.retriveArticles()
    this.retriveComments()

    this.setState({
      currentUser: this.props.currentUser
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      this.retriveArticles()
      this.retriveComments()
    }
  }

  retriveArticles = async () => {
    const article = await api.retriveArticleById(this.props.match.params)
    this.setState({
      article: [article.data.articles]
    });
  }

  retriveComments = async () => {
    const comments = await api.retriveCommentsByArticle(this.props.match.params)
    this.sortComments(comments)
    this.setState({
      comments: comments.data.comments
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
              <p>Votes: {this.state.article[0].votes}</p>
              <button className='UPVoteButton' key={`${this.state.article[0]._id}UP`} onClick={this.handleVoteClick} value={this.state.article[0]._id}>Up</button>
              <button className='DOWNVoteButton' key={`${this.state.article[0]._id}DOWN`} onClick={this.handleVoteClick} value={this.state.article[0]._id}>Down</button>
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
                <button onClick={this.handleClick} value={comment._id}>Up</button><button onClick={this.handleClick} value={comment._id}>Down</button>
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

  handleVoteClick = async (e) => {
    await api.updateVotesArticle(e.target.value, e.target.innerText)
  }

  handleInput = (event) => {
    this.setState({ newComment: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault(this.state);
    if (this.state.newComment !== '') {
      const user = await api.retriveProfile(this.state)
      await api.addNewComment(this.state.newComment, this.state.article[0]._id, user.data.user._id);
      this.setState({
        newComment: ''
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
}

export default Article;