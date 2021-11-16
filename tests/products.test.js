/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable no-undef */
import supertest from 'supertest';
import '../src/setup.js';
import { app } from '../src/app';
import { connection } from '../src/database.js';

beforeAll(async () => {
  await connection.query(`insert into products(name, price, descrition, "imgeUrl") values('teste', 1000, 'teste', 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg')`);
});
afterAll(async () => {
  await connection.query('DELETE FROM products;');
  connection.end();
});

describe('GET /products', () => {
  test('returns status 200 for get products', async () => {
    const result = await supertest(app).get('/products');
    const { status } = result;
    expect(status).toEqual(200);
  });
});

describe('POST /products', () => {
  test('returns status 201 for valid body', async () => {
    const result = await supertest(app).post('/products').send({
      name: 'Monitor',
      price: 800,
      imgeUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
      descrition: 'Quack',
    });
    const { status } = result;
    expect(status).toEqual(201);
  });

  test('returns status 400 for invalid body', async () => {
    const result = await supertest(app).post('/products').send({
      name: 'Monitor',
      price: 800,
      imgeUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
    });
    const { status } = result;
    expect(status).toEqual(400);
  });
});

describe('GET /products/:id', () => {
  test('returns status 404 for invalid id', async () => {
    const result = await supertest(app).get('/products/1');
    const { status } = result;
    expect(status).toEqual(404);
  });
  test('returns status 200 for valid id', async () => {
    const id = await connection.query('select * from products;');
    const result = await supertest(app).get(`/products/${id.rows[0].id}`);
    const { status } = result;
    expect(status).toEqual(200);
  });
});
