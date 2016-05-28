import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';

const socket = io('http://localhost:3000');

socket.on('new_message', data => {
  console.log(data);
});

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('app')
);
