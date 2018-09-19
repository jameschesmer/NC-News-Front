import React, { Component } from 'react';
import * as api from './api'

class Profile extends Component {
  state = {
    user: '',
    avatar: '',
    articles: []
  }

  componentDidMount = async () => {
    const user = await api.retriveProfile(this.props)
    // const articles = await api.retriveArticlesByUser()
    console.log(user.data.user)
    this.setState({
      user: user.data.user.name,
      avatar: user.data.user.avatar_url
      // articles: articles.data.articles
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

export default Profile;