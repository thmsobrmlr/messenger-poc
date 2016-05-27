import express from 'express';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import socketIo from 'socket.io';

import messenger from './messenger';
import { appPort, pageAccessToken } from './config';

const app = express();
const server = app.listen(appPort, () => {
  console.log(chalk.green.bold(`App is listening on port ${appPort}!`));
});
const io = socketIo(server);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// static files
app.use(express.static(`${__dirname}/../public/`));

app.get('/client.bundle.js', (req, res) => {
  res.sendfile(`${__dirname}/client.bundle.js`);
});

app.get('/', (req, res) => {
  res.sendfile('index.html');
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
      const text = event.message.text;

      io.emit('new_message', { event });

      switch (text) {
        case 'image': {
          messenger.sendImage(pageAccessToken, senderId, 'http://placekitten.com/200/300');
          break;
        }
        case 'generic': {
          messenger.sendGenericTemplate(pageAccessToken, senderId);
          break;
        }
        case 'receipt': {
          messenger.sendReceiptTemplate(pageAccessToken, senderId);
          break;
        }
        default: {
          const reply = `Text received, echo: ${text.substring(0, 200)}`;
          messenger.sendTextMessage(pageAccessToken, senderId, reply);
          io.emit('new_message', { reply });
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
