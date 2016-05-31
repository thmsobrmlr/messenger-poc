import React from 'react';
import update from 'react-addons-update';

import MessageBox from '../components/MessageBox';

import io from 'socket.io-client';
const socket = io('http://localhost:3000');

class MessageBoxContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    socket.on('new_message', message => {
      this.setState(update(this.state, {
        messages: { $push: [message] },
      }));
    });
  }

  render() {
    return (
      <MessageBox messages={this.state.messages} />
    );
  }
}

export default MessageBoxContainer;
