import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Articles from './components/Articles'
import Profile from './components/Profile'
import Article from './components/Article'
import NewArticle from './components/NewArticle'
import './CSS/App.css'
import Login from './components/Login';
import Page404 from './components/Page404';

class App extends Component {
  state = {
    currentUser: '',
    user: ''
  }
  render() {
    return (
      <div className="App">
        {(this.state.currentUser !== '' || sessionStorage.currentUser !== undefined) ?
          < div >
            {this.updateUserFromLocalStorage()}
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
            <Route exact path='/Page404' render={() => < Page404
            />}
            />
          </div> : <Route path='/' render={(props) => <Login
            {...props} updateUser={this.updateUser}
          />}
          />
        }
      </div>
    );
  }

  updateUser = (username, user) => {
    sessionStorage.setItem('currentUser', `${username}`)
    sessionStorage.setItem('user', `${user}`)
    this.setState({
      currentUser: username,
      user: user
    })
  }

  updateUserFromLocalStorage = () => {
    if (this.state === '') {
      this.setState({
        currentUser: sessionStorage.currentUser,
        user: sessionStorage.user
      })
    }
  }
}

export default App;
