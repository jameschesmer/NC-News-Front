import React, { Component } from 'react';
import * as api from './api'
import { Link, Redirect } from 'react-router-dom';
import '../CSS/Articles.css'
import moment from 'moment'
import Votes from './Votes';

class Articles extends Component {
  state = {
    articles: [],
    err: null
  }

  componentDidMount() {
    this.retriveArticles()
  }

  retriveArticles = async () => {
    const articles = await api.retriveArticlesByTopicSlug(this.props.match.params)
    if (articles.status === 200) {
      this.sortArticles(articles)
      this.setState({
        articles: articles.data.articles
      });
    } else {
      this.setState({
        err: true
      })
    }
  }

  render() {
    return (
      (this.state.err !== null) ? <Redirect to="/Page404" /> :
        <div className='outerArticleContainer'>
          {/* {Object.keys((this.props.match.params)) && <h1>{Object.values((this.props.match.params))[0]}</h1>} */}
          {this.state.articles.map(article => {
            return <div className='articleContainer' key={article._id}>
              <div className='articleButton' key={article._id}  >
                <Link to={`/articles/${article._id}`} key={article._id} >
                  <h2>{article.title}</h2>
                  <p>{article.belongs_to}: {article.body.slice(0, 45)}...</p>
                  <p>Comments: {article.comment_count}</p>
                </Link>
                <Votes article={article} />
              </div>
            </div>
          })}
        </div >
    );
  }

  sortArticles = (articles) => {
    return articles.data.articles.sort((a, b) => {
      return moment(b.created_at).valueOf() - moment(a.created_at).valueOf()
    })
  }
}

export default Articles;