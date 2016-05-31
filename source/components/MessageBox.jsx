import React from 'react';

import MessageBoxHeader from './MessageBoxHeader';
import MessageForm from './MessageForm';
import MessageListContainer from '../containers/MessageListContainer';

import styles from './MessageBox.css';

const MessageBox = () =>
  <div className={styles.messageBox}>
    <MessageBoxHeader />
    <MessageListContainer />
    <MessageForm />
  </div>;

export default MessageBox;
