import React, { Component } from 'react';
import * as api from './api'

class NewArticle extends Component {
  state = {
    title: '',
    content: '',
    topic: 'Coding',
    user_id: ''
  }

  componentDidMount = async () => {
    const user = await api.retriveProfile(this.props)
    this.setState({
      user_id: user.data.user._id,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Title</p>
        <input type="text" value={this.state.title} onChange={this.handleTitle} />
        <p>Topic</p>
        <select value={this.state.topic} onChange={this.handleChange}>
          <option value="Coding">Coding</option>
          <option value="Football">Football</option>
          <option value="Cooking">Cooking</option>
        </select>
        <p>Your article: </p>
        <input type="text" value={this.state.content} onChange={this.handleInput} />
        <p>Finished?</p>
        <button>Submit</button>
      </form>
    );
  }

  handleChange = (event) => {
    this.setState({ topic: event.target.value });
  }

  handleInput = (event) => {
    this.setState({ content: event.target.value });
  }

  handleTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    api.addNewArticle(this.state)
  }
}

export default NewArticle;