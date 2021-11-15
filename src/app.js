/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import { getProductById, getProducts, postProducts } from './controllers/products.js';
import { signIn } from './controllers/sign-in.js';
import { signUp } from './controllers/sign-up.js';
import { cartItens } from './controllers/cartItens.js';
import { removeIten } from './controllers/removeIten.js';
import { addtocart } from './controllers/addtocart.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/removefromcart', async (req, res) => {
  const { id } = req.body;
  try {
    console.log(id);
    res.status(200).send({ id });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/cartitens/:id', cartItens);

app.post('/sign-in', signIn);

app.post('/sign-up', signUp);

app.delete('/remove/:id', removeIten);

// ------HOME------
app.get('/products', getProducts);
app.post('/products', postProducts);

// ------PRODUCT PAGE------
app.get('/products/:id', getProductById);

app.post('/addtocart/:id', addtocart);

export { app };
