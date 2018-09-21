import React, { Component } from 'react';
import * as api from './api'

class Votes extends Component {
  state = {
    votes: 0
  }
  render() {
    return (
      <div className='votesDiv'>
        <p className='VoteCount' >Votes: {this.props.article.votes + this.state.votes}</p>
        <button disabled={this.state.votes !== 0} className='UPButton' key={`${this.props.article._id}UP`} onClick={() => this.handleClick(this.props.article._id, 'UP')}>Up</button>
        <button disabled={this.state.votes !== 0} className='DOWNButton' key={`${this.props.article._id}DOWN`} onClick={() => this.handleClick(this.props.article._id, 'DOWN')} >Down</button>
      </div>
    );
  }

  handleClick = (id, direction) => {
    api.updateVotesArticle(id, direction)
    let vote = direction === 'UP' ? 1 : direction === 'DOWN' ? -1 : 0
    this.setState({
      votes: vote
    })
  }
}

export default Votes;