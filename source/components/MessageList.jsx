import React, { PropTypes } from 'react';

import Message from './Message';
import styles from './MessageList.css';

function MessageList(props) {
  const messageNodes = props.messages.map((message) =>
    <Message {...message} />
  );

  return (
    <div className={styles.messageList}>
      {messageNodes}
    </div>
  );
}

MessageList.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default MessageList;
