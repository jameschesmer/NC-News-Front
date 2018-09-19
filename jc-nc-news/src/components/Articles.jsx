import React, { Component } from 'react';
import * as api from './api'
import { Link } from 'react-router-dom';

class Articles extends Component {
  state = {
    articles: []
  }

  componentDidMount() {
    this.retriveArticles()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.retriveArticles()
    }
  }

  retriveArticles = async () => {
    const articles = await api.retriveArticlesByTopicSlug(this.props.match.params)
    this.setState({
      articles: articles.data.articles
    });
  }

  render() {
    return (
      <div>
        {Object.keys((this.props.match.params)) && <h1>{Object.values((this.props.match.params))[0]}</h1>}
        {this.state.articles.map(article => {
          return <Link to={`/articles/${article._id}`} key={article._id} ><button key={article._id}  >
            <h2>{article.title}</h2>
            <p>{article.belongs_to}: {article.body.slice(0, 45)}...</p>
            <p>Votes: {article.votes}</p>
            {article.comment_count && <p>Comments: {article.comment_count}</p>}
          </button></Link>

        })}
      </div >
    );
  }
}

export default Articles;