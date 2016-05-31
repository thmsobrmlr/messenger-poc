// TODO: Add props validation
import React from 'react';

import MessageBoxHeader from './MessageBoxHeader';
import MessageForm from './MessageForm';
import MessageList from '../components/MessageList';

import styles from './MessageBox.css';

const MessageBox = (props) =>
  <div className={styles.messageBox}>
    <MessageBoxHeader />
    <MessageList messages={props.messages} />
    <MessageForm />
  </div>;

export default MessageBox;
