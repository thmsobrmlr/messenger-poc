import React from 'react';
import update from 'react-addons-update';

import MessageList from '../components/MessageList';

import io from 'socket.io-client';
const socket = io('http://localhost:3000');

class MessageListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [
        { id: 'fake_mid1', senderId: 'fakeSenderId', text: 'This is the first message', type: 'text' },
      ],
    };
  }

  componentDidMount() {
    socket.on('new_message', message => {
      if (message.event) {
        const newMessage = {
          id: message.event.message.mid,
          senderId: 'asdf',
        };

        if (message.event.message.text) {
          newMessage.text = message.event.message.text;
          newMessage.type = 'text';
        } else {
          newMessage.type = message.event.message.attachment.type;
          newMessage.attachment = message.event.message.attachment;
        }

        this.setState(update(this.state, {
          messages: { $push: [newMessage] },
        }));
      }
    });
  }

  render() {
    return (
      <MessageList messages={this.state.messages} />
    );
  }
}

export default MessageListContainer;
