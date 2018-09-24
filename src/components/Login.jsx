import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as api from './api'
import '../CSS/Login.css'

class Login extends Component {
  state = {
    users: [],
    err: null
  }

  componentDidMount = async () => {
    const users = await api.retriveUsers()
    if (users.status === 200) {
      this.setState({
        users: users.data.users
      })
    } else {
      this.setState({
        err: true
      })
    }
  }

  render() {
    return (
      (this.state.err !== null) ? <Redirect to="/Page404" /> :
        <div>
          <h1>Please choose your login...</h1>
          {(this.state.users.length > 0) &&
            (<div>
              {this.state.users.map(user => {
                return <button className='loginButton' key={user._id} onClick={() => this.props.updateUser(user.username, user.name)}>
                  <img src={`${user.avatar_url}`} alt={`${user.name}`} onError={(e) => { e.target.src = "https://static.boredpanda.com/blog/wp-content/uploads/2017/09/funny-dog-thoughts-tweets-1.jpg" }}
                  />
                  <h1>{user.name}</h1>
                </button>
              })}
            </div>)
          }
        </div>
    );
  }
}

export default Login;