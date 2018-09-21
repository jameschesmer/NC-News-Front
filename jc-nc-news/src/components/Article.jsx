import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as api from './api'
import '../CSS/Article.css'
import moment from 'moment'
import Comment from './Comment'

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
    if (article.status === 200) {
      const comments = await api.retriveCommentsByArticle(this.props.match.params)
      if (comments.status === 200) {
        let sortedComments = this.sortComments(comments)
        this.setState({
          article: [article.data.articles],
          comments: sortedComments
        });
      } else {
        this.setState({
          article: [article.data.articles]
        });
      }
    } else {
      return (<Redirect to="/Page404" />)
    }
  }

  render() {
    return (
      <div>
        {this.state.article.length > 0 &&
          <div>
            <div className='thisArticle'>
              <h2>{this.state.article[0].title}</h2>
              <p>{this.state.article[0].created_by.name}</p>
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
            {this.state.comments.length > 0 && <div className='articlePage'>Comments:
                {this.state.comments.map(comment => {
                return <Comment key={comment._id} comment={comment} handleDelete={this.handleDelete} article_id={this.state.article[0]._id} currentUser={this.props.currentUser} name={this.props.user} />
              })}
            </div>}
          </div>
        }
      </div>
    )
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