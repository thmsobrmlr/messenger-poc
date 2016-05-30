import React from 'react';

import styles from './Message.css';

const Message = (props) =>
  <div className={styles.message}>
    <span className="messageAuthor">
      {props.senderId}
    </span>
    {props.children}
  </div>;

export default Message;
