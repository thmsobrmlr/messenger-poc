// TODO: Remove eslint disable
/* eslint-disable react/no-multi-comp, react/prefer-stateless-function, react/prop-types */

import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update';

const socket = io('http://localhost:3000');

class MessageList extends React.Component {
  render() {
    const messageNodes = this.props.messages.map((message) => {
      return (
        <Message author={message.author} key={message.id}>
          {message.text}
        </Message>
      );
    });

    return (
      <div className="messageList">
        {messageNodes}
      </div>
    );
  }
}

class MessageForm extends React.Component {
  render() {
    return (
      <div className="messageForm">
        Hello, world! I am a MessageForm.
      </div>
    );
  }
}

class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    socket.on('new_message', message => {
      if (message.event) {
        const newMessage = {
          id: message.event.message.mid,
          senderId: 'asd',
          text: message.event.message.text || message.event.message.attachment.type,
        };

        const newState = update(this.state, {
          messages: { $push: [newMessage] },
        });

        this.setState(newState);
      }
    });
  }

  render() {
    return (
      <div className="messageBox">
        <h1>Messages</h1>
        <MessageList messages={this.state.messages} />
        <MessageForm />
      </div>
    );
  }
}

class Message extends React.Component {
  render() {
    return (
      <div className="message">
        <h2 className="messageAuthor">
          {this.props.senderId}
        </h2>
        {this.props.children}
      </div>
    );
  }
}

ReactDOM.render(
  <MessageBox />,
  document.getElementById('app')
);
