import React from 'react';

import styles from './MessageForm.css';

const MessageForm = () =>
  <div className={styles.messageForm}>
    <textarea className={styles.textarea} placeholder="Type message here…" />
  </div>;

export default MessageForm;
