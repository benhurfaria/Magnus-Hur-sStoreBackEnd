/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import { getProductById, getProducts, postProducts } from './controllers/products.js';
import { signIn } from './controllers/sign-in.js';
import { signUp } from './controllers/sign-up.js';
import { signOut } from './controllers/sign-out.js';
import { cartItens } from './controllers/cartItens.js';
import { removeIten } from './controllers/removeIten.js';
import { addtocart } from './controllers/addtocart.js';
import { sales } from './controllers/sales.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sales', sales);

app.get('/cartitens', cartItens);

app.post('/sign-in', signIn);

app.post('/sign-up', signUp);

app.delete('/sign-out', signOut);

app.delete('/remove/:id', removeIten);

// ------HOME------
app.get('/products', getProducts);
app.post('/products', postProducts);

// ------PRODUCT PAGE------
app.get('/products/:id', getProductById);

app.post('/addtocart', addtocart);

export { app };
