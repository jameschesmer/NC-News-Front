import React, { Component } from 'react';
import * as api from './api'

class Article extends Component {
  state = {
    article: [],
    comments: []
  }

  componentDidMount() {
    this.retriveArticles()
    this.retriveComments()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
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
    this.setState({
      comments: comments.data.comments
    });
  }

  render() {
    return (
      <div>
        {this.state.article.length > 0 &&
          <div>
            <h2>{this.state.article[0].title}</h2>
            <p>{this.state.article[0].belongs_to}: {this.state.article[0].body}</p>
            <p>Votes: {this.state.article[0].votes}</p>
            <div>Comments: {this.state.comments.map(comment => {
              return <div key={comment._id}>
                <p>Comment: {comment.body}</p>
                <p>Date: {comment.created_at}</p>
                <p>Votes: {comment.votes}</p>
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
}

export default Article;