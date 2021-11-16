import express from 'express';
import cors from 'cors';

import { getProductById, getProducts, postProducts } from './controllers/products.js';

import { signIn } from './controllers/sign-in.js';
import { signUp } from './controllers/sign-up.js';
import { signOut } from './controllers/sign-out.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sign-in', signIn);

app.post('/sign-up', signUp);

app.delete('/sign-out', signOut);
// ------HOME------
app.get('/products', getProducts);
app.post('/products', postProducts);

// ------PRODUCT PAGE------
app.get('/products/:id', getProductById);

export default app;
