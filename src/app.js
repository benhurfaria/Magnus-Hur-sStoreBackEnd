import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from './database.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/teste', async (req, res) => {
    try {
        res.status(200).send('ola');
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
);

app.get('/oi', async (req, res) => {
    try {
        res.status(200).send('ola mundo');
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/xablau', (req,res)=>{
    res.sendStatus(500);
})


export default app;