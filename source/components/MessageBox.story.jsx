import React from 'react';
import { storiesOf } from '@kadira/storybook';

import MessageBox from './MessageBox';

const messages = [
  {
    key: 'fake_mid',
    type: 'text',
    text: 'This is an incoming message :-)',
    direction: 'incoming',
  },
  {
    key: 'fake_mid2',
    type: 'text',
    text: 'This is an outgoing message',
    direction: 'outgoing',
  },
  {
    key: 'fake_mid3',
    type: 'image',
    attachment: {
      payload: {
        url: 'http://petersapparel.parseapp.com/img/item100-thumb.png',
      },
    },
    direction: 'incoming',
  },
  {
    key: 'fake_mid4',
    type: 'image',
    attachment: {
      payload: {
        url: 'http://petersapparel.parseapp.com/img/item101-thumb.png',
      },
    },
    direction: 'outgoing',
  },
];

storiesOf('MessageBox', module)
  .add('with messages', () => (
    <MessageBox messages={messages} />
  ));
