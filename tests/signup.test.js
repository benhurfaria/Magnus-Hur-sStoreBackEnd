import '../src/setup.js';
import app from '../src/app.js';
import supertest from 'supertest';
import connection from '../src/database.js';
import {
  validBodyFactorySignup,
  invalidBodyFactorySignup,
} from '../src/factories/signup.factory.js';

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
