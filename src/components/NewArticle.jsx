import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as api from './api'
import PropTypes from 'prop-types'
import '../CSS/NewArticle.css'

class NewArticle extends Component {
  state = {
    title: '',
    content: '',
    topic: 'Coding',
    user_id: '',
    addedArticle: false
  }

  componentDidMount = async () => {
    const user = await api.retriveProfile(this.props)
    this.setState({
      user_id: user.data.user._id,
    });
  }

  render() {
    if (this.state.addedArticle) return <Redirect to="/" />
    return (
      <form className='NewArticleForm' onSubmit={this.handleSubmit}>
        <h1>Title</h1>
        <input type="text" value={this.state.title} onChange={this.handleTitle} />
        <h2>Choose a topic:</h2>
        <select value={this.state.topic} onChange={this.handleChange}>
          <option value="Coding">Coding</option>
          <option value="Football">Football</option>
          <option value="Cooking">Cooking</option>
        </select>
        <h3>Your article: </h3>
        <textarea rows='5' value={this.state.content} onChange={this.handleInput} />
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

  handleSubmit = async (event) => {
    event.preventDefault();
    await api.addNewArticle(this.state);
    this.setState({
      addedArticle: true
    })
  }
}

NewArticle.propTypes = {
  currentUser: PropTypes.string.isRequired
}

export default NewArticle;