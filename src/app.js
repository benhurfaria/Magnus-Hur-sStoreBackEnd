import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from './database.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/teste', async (req, res) => {

    console.log('ok')
    try {
        res.status(201).send('ola');
    } catch (error) {
        console.log(error);
        res.sendStatus(500);

    }
}
)



export default app;