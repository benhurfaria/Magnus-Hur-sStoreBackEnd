import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app';
import { connection } from '../src/database.js';

import {
  validBodyFactoryProduct,
  invalidBodyFactoryProduct,
} from '../src/factories/products.factory.js';

// eslint-disable-next-line no-undef
beforeAll(async () => {
  const validBody = validBodyFactoryProduct();

  await connection.query(
    `
            INSERT INTO products
                (name, price, "imgeUrl", descrition)
            VALUES
                ($1, $2, $3, $4);
        `,
    [validBody.name, validBody.price, validBody.imgeUrl, validBody.descrition],
  );
});
// eslint-disable-next-line no-undef
afterAll(async () => {
  await connection.query('DELETE FROM products;');
  connection.end();
});

// eslint-disable-next-line no-undef
describe('GET /products', () => {
  // eslint-disable-next-line no-undef
  test('returns status 200 for get products', async () => {
    const result = await supertest(app).get('/products');

    const { status } = result;

    // eslint-disable-next-line no-undef
    expect(status).toEqual(200);
  });
});

// eslint-disable-next-line no-undef
describe('POST /products', () => {
  const validBody = validBodyFactoryProduct();
  const invalidBody = invalidBodyFactoryProduct();

  // eslint-disable-next-line no-undef
  test('returns status 201 for valid body', async () => {
    const result = await supertest(app).post('/products').send(validBody);
    const { status } = result;

    // eslint-disable-next-line no-undef
    expect(status).toEqual(201);
  });

  // eslint-disable-next-line no-undef
  test('returns status 400 for invalid body', async () => {
    const result = await supertest(app).post('/products').send(invalidBody);
    const { status } = result;

    // eslint-disable-next-line no-undef
    expect(status).toEqual(400);
  });
});

// eslint-disable-next-line no-undef
describe('GET /products/:id', () => {
  let idValid;
  async function getIdParams() {
    idValid = await connection.query('SELECT * FROM products;');
    idValid = idValid.rows[0].id;

    return idValid;
  }

  // eslint-disable-next-line no-undef
  test('returns status 404 for invalid id', async () => {
    const id = await getIdParams();

    const result = await supertest(app).get(`/products/${id + 50}`);
    const { status } = result;

    // eslint-disable-next-line no-undef
    expect(status).toEqual(404);
  });

  // eslint-disable-next-line no-undef
  test('returns status 200 for valid id', async () => {
    const id = await getIdParams();

    const result = await supertest(app).get(`/products/${id}`);
    const { status } = result;

    // eslint-disable-next-line no-undef
    expect(status).toEqual(200);
  });
});
