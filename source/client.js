import io from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('new_message', data => {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});
