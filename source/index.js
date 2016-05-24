import express from 'express';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();
const port = process.env.APP_PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(chalk.green.bold(`App is listening on port ${port}!`));
});
