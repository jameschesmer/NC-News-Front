import React, { Component } from 'react';

class Votes extends Component {
  state = {
    votes: 0
  }
  render() {
    return (
      <div>
        <p>Votes: {this.props.votes + this.state.votes}</p>
      </div>
    );
  }
}

export default Votes;