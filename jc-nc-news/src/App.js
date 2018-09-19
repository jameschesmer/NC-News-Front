import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css';
import Articles from './components/Articles'
import Profile from './components/Profile'
import Article from './components/Article'
import NewArticle from './components/NewArticle'

class App extends Component {
  state = {
    currentUser: 'jessjelly'
  }
  render() {
    return (
      <div className="App">
        <nav>
          <Link to='/articles'>Home</Link>
          <Link to='/profile'>Profile</Link>
          <Link to='./newArticle'>Write new article</Link>
        </nav>
        <nav>
          <Link to='/topics/Coding/articles'>Coding</Link>
          <Link to='/topics/Football/articles'>Football</Link>
          <Link to='/topics/Cooking/articles'>Cooking</Link>
        </nav>


        <Route exact path='/articles' render={(props) => <Articles
          {...props}
        />}
        />
        <Route exact path='/profile' render={(props) => <Profile
          {...this.state}
        />}
        />
        <Route exact path='/topics/:topic_slug/articles' render={(props) => <Articles
          {...props} />}
        />
        <Route exact path='/articles/:article_id' render={(props) => <Article
          {...props} />}
        />
        <Route exact path='/newArticle' render={(props) => <NewArticle
          {...this.state} />}
        />
      </div>
    );
  }
}

export default App;
