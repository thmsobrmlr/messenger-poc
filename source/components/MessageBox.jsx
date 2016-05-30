import React from 'react';

import MessageForm from './MessageForm';
import MessageListContainer from '../containers/MessageListContainer';

const MessageBox = () =>
  <div className="messageBox">
    <h1>Messages</h1>
    <MessageListContainer />
    <MessageForm />
  </div>;

export default MessageBox;
