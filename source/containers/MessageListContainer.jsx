import React from 'react';
import update from 'react-addons-update';

import MessageList from '../components/MessageList';

import io from 'socket.io-client';
const socket = io('http://localhost:3000');

class MessageListContainer extends React.Component {
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
      <MessageList messages={this.state.messages} />
    );
  }
}

export default MessageListContainer;
