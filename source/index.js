import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import chalk from 'chalk';

import messenger from './messenger';

dotenv.config();
const port = process.env.APP_PORT || 3000;
const pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
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
        }
      }
    }
  }

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(chalk.green.bold(`App is listening on port ${port}!`));
});
