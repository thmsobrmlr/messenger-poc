import React from 'react';

import TextMessage from './TextMessage';
import ImageMessage from './ImageMessage';
import TemplateMessage from './TemplateMessage';

function MessageList(props) {
  const messageNodes = props.messages.map((message) => {
    let messageElem;

    if (message.type == 'text') {
      messageElem = <TextMessage key={message.id} author={message.author} key={message.id}>{message.text}</TextMessage>;
    } else if (message.type == 'image') {
      messageElem = <ImageMessage key={message.id} url={message.attachment.payload.url} />;
    } else if (message.type == 'template') {
      messageElem = <TemplateMessage key={message.id} />;
    }
    return messageElem;
  });

  return (
    <div className="messageList">
      {messageNodes}
    </div>
  );
}

export default MessageList;
