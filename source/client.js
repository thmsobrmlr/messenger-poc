// TODO: Remove eslint disable
/* eslint-disable react/no-multi-comp, react/prefer-stateless-function, react/prop-types */

import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';

const socket = io('http://localhost:3000');

class MessageList extends React.Component {
  render() {
    const messageNodes = this.props.data.map((message) => {
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
      data: [],
    };
  }

  componentDidMount() {
    socket.on('new_message', message => {
      console.log(message);

      if (message.event) {
        const ggg = [
          { id: 1, author: 'Pete Hunter', text: message.event.message.text },
        ];

        this.setState({ data: ggg });
      }
    });
  }

  render() {
    return (
      <div className="messageBox">
        <h1>Messages</h1>
        <MessageList data={this.state.data} />
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
          {this.props.author}
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
