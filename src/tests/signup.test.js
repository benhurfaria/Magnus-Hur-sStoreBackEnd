/* eslint-disable no-undef */
import supertest from 'supertest';
import '../setup.js';
import app from '../app.js';
import connection from '../database.js';
import {
  validBodyFactorySignup,
  invalidBodyFactorySignup,
} from '../factories/signup.factory.js';

afterAll(async () => {
  connection.end();
});

describe('POST /sign-up', () => {
  const validBody = validBodyFactorySignup();
  const invalidBody = invalidBodyFactorySignup();

  afterAll(async () => {
    await connection.query(`
            DELETE FROM usuario;
        `);
  });

  test('returns 400 there is some inconsistent information', async () => {
    const result = await supertest(app).post('/sign-up').send(invalidBody);

    expect(result.status).toEqual(400);
  });

  test('returns 200 when send valid information', async () => {
    const result = await supertest(app).post('/sign-up').send(validBody);

    expect(result.status).toEqual(200);
  });
});
