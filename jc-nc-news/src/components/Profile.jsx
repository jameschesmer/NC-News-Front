import React, { Component } from 'react';
import * as api from './api'
import PropTypes from 'prop-types'

class Profile extends Component {
  state = {
    user: '',
    avatar: ''
  }

  componentDidMount = async () => {
    const user = await api.retriveProfile(this.props)
    this.setState({
      user: user.data.user.name,
      avatar: user.data.user.avatar_url
    });
  }

  render() {
    return (
      <div>
        <img src={this.state.avatar} alt="Current User"></img>
        <h1>{this.state.user}</h1>
      </div>
    );
  }
}

Profile.propTypes = {
  currentUser: PropTypes.string.isRequired
}
export default Profile;