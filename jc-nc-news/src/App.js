import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Articles from './components/Articles'
import Profile from './components/Profile'
import Article from './components/Article'
import NewArticle from './components/NewArticle'
import './CSS/App.css'
import Login from './components/Login';

class App extends Component {
  state = {
    currentUser: 'jessjelly',
    user: 'Jess Jelly'
  }
  render() {
    return (
      <div className="App">
        {this.state.currentUser !== '' ?
          <div>
            <nav className='topBar'>
              <Link to='/'>Home</Link>
              <Link to='/profile'>Profile</Link>
              <Link to='/newArticle'>New article</Link>
              <div className="dropdown">
                <button className="dropbtn">Select Topic</button>
                <div className='content'>
                  <Link to='/topics/Coding/articles'>Coding</Link>
                  <br />
                  <Link to='/topics/Football/articles'>Football</Link>
                  <br />
                  <Link to='/topics/Cooking/articles'>Cooking</Link>
                </div>
              </div>
            </nav>


            <Route exact path='/' render={(props) => <Articles
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
              {...props} {...this.state} />}
            />
            <Route exact path='/newArticle' render={(props) => <NewArticle
              {...this.state} />}
            />
          </div> : <Route exact path='/' render={(props) => <Login
            {...props} updateUser={this.updateUser}
          />}
          />
        }
      </div>
    );
  }

  updateUser = (username) => {
    this.setState({
      currentUser: username
    })
  }
}

export default App;
