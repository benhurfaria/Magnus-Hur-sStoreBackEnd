import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from './database.js';
import { getProducts, postProducts } from './controllers/products.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/teste', async (req, res) => {


});

app.get('/oi', async (req, res)=>{
    try {
        res.status(201).send('ola');
    } catch (error) {
        console.log(error);
        res.sendStatus(500);

    }
}
);

// ------HOME------
app.get('/products', getProducts);
app.post('/products', postProducts);





export default app;