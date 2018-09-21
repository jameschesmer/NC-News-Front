import React, { Component } from 'react';
import * as api from './api'

class Login extends Component {
  state = {
    users: []
  }

  componentDidMount = async () => {
    const users = await api.retriveUsers()
    this.setState({
      users: users.data.users
    })
  }

  render() {
    return (
      <div>
        <h1>Please choose your login...</h1>
        {(this.state.users.length > 0) &&
          (<div>
            {this.state.users.map(user => {
              return <button key={user._id} onClick={() => this.props.updateUser(user.username)}>
                <img src={`${user.avatar_url}`} alt="" />
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