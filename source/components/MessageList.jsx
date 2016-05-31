// TODO: Add props validation
import React from 'react';

import Message from './Message';
import styles from './MessageList.css';

function MessageList(props) {
  const messageNodes = props.messages.map((message) => {
    console.log(message);
    return <Message {...message} />;
  });

  return (
    <div className={styles.messageList}>
      {messageNodes}
    </div>
  );
}

export default MessageList;
