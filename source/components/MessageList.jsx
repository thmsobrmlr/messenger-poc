// TODO: Add props validation
import React from 'react';

import Message from './Message';

function MessageList(props) {
  const messageNodes = props.messages.map((message) => {
    console.log(message);
    return <Message {...message} />;
  });

  return (
    <div className="messageList">
      {messageNodes}
    </div>
  );
}

export default MessageList;
