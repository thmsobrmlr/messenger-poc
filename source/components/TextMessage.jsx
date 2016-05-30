import React from 'react';

import styles from './Message.css';

const TextMessage = (props) =>
  <div className={styles.message}>
    <span className="messageAuthor">
      {props.senderId}
    </span>
    {props.children}
  </div>;

export default TextMessage;
