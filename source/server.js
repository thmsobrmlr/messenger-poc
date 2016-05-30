import express from 'express';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import socketIo from 'socket.io';

import messenger from './lib/messenger';
import transformMessage from './lib/message';
import { pageAccessToken } from './config';

const HOST = 'localhost';
const PORT = 3000;

const app = express();
const server = app.listen(PORT, HOST, () => {
  console.log(chalk.green.bold(`server running at http://${HOST}:${PORT}/`));
});
const io = socketIo(server);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// static files
app.use(express.static(`${__dirname}/../public/`));

if (process.env.NODE_ENV === 'production') {
  app.get('/client.bundle.js', (req, res) => {
    res.sendFile(`${__dirname}/client.bundle.js`);
  });
}

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// webhook verification
app.get('/webhook/', (req, res) => {
  if (req.query['hub.verify_token'] === 'this_is_my_token') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong token');
});

// webhook handling
app.post('/webhook/', (req, res) => {
  const messagingEvents = req.body.entry[0].messaging;

  for (const event of messagingEvents) {
    const senderId = event.sender.id;

    if (event.message && event.message.text) {
      io.emit('new_message', transformMessage(event));

      switch (event.message.text) {
        case 'image': {
          messenger.sendImage(pageAccessToken, senderId, 'http://placekitten.com/200/300')
            .then((message) => { io.emit('new_message', transformMessage(message)); });
          break;
        }
        case 'generic': {
          messenger.sendGenericTemplate(pageAccessToken, senderId)
            .then((message) => { io.emit('new_message', transformMessage(message)); });
          break;
        }
        case 'receipt': {
          messenger.sendReceiptTemplate(pageAccessToken, senderId)
            .then((message) => { io.emit('new_message', transformMessage(message)); });
          break;
        }
        default: {
          const reply = `Echo: ${event.message.text.substring(0, 200)}`;
          messenger.sendTextMessage(pageAccessToken, senderId, reply)
            .then((message) => { io.emit('new_message', transformMessage(message)); });
        }
      }
    }
  }

  res.sendStatus(200);
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
