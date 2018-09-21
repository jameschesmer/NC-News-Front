import React, { Component } from 'react';
import * as api from './api'
import { Link } from 'react-router-dom';
import '../CSS/Articles.css'
import moment from 'moment'
import Votes from './Votes';

class Articles extends Component {
  state = {
    articles: []
  }

  componentDidMount() {
    this.retriveArticles()
  }

  retriveArticles = async () => {
    const articles = await api.retriveArticlesByTopicSlug(this.props.match.params)
    this.sortArticles(articles)
    this.setState({
      articles: articles.data.articles
    });
  }

  render() {
    return (
      <div className='outerArticleContainer'>
        {/* {Object.keys((this.props.match.params)) && <h1>{Object.values((this.props.match.params))[0]}</h1>} */}
        {this.state.articles.map(article => {
          return <div className='articleContainer' key={article._id}>
            <button className='articleButton' key={article._id}  ><Link to={`/articles/${article._id}`} key={article._id} >
              <h2>{article.title}</h2>
              <p>{article.belongs_to}: {article.body.slice(0, 45)}...</p>
              <Votes votes={article.votes} />
              <p>Comments: {article.comment_count}</p>
            </Link>
            </button>
            <button className='UPButton' key={`${article._id}UP`} onClick={() => this.handleClick(article._id, 'UP')}>Up</button>
            <button className='DOWNButton' key={`${article._id}DOWN`} onClick={() => this.handleClick(article._id, 'DOWN')} >Down</button></div>
        })}
      </div >
    );
  }

  handleClick = (id, direction) => {
    api.updateVotesArticle(id, direction)
  }

  sortArticles = (articles) => {
    return articles.data.articles.sort((a, b) => {
      return moment(b.created_at).valueOf() - moment(a.created_at).valueOf()
    })
  }
}

export default Articles;