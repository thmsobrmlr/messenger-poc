import React from 'react';

import Message from './Message';

function MessageList(props) {
  const messageNodes = props.messages.map((message) => {
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

export default MessageList;
