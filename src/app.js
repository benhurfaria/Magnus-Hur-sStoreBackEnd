import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from './database.js';
import { signUp } from './controllers/sign-up.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/teste', async (req, res) => {
  try {
    res.status(200).send('ola');
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get('/oi', async (req, res) => {
  try {
    res.status(200).send('ola mundo');
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get('/xablau', (req, res) => {
  res.sendStatus(500);
});

app.post('/sign-up', signUp);

export default app;
