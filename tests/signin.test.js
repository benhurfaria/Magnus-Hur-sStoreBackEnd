import '../src/setup.js';
import app from '../src/app.js';
import supertest from 'supertest';
import connection from '../src/database.js';
import { validBodyFactorySignup } from '../src/factories/signup.factory.js';
import bcrypt from 'bcrypt';

afterAll(async () => {
  connection.end();
});

describe('POST /sign-in', () => {
  const validBody = validBodyFactorySignup();
  const password1 = bcrypt.hashSync(validBody.password, 10);

  beforeAll(async () => {
    await connection.query(
      `INSERT INTO usuario (name, email, password) VALUES ($1, $2, $3);`,
      [validBody.name, validBody.email, password1]
    );
  });

  afterAll(async () => {
    await connection.query(`DELETE FROM sessions;`);
    await connection.query(`DELETE FROM usuario;`);
  });

  test('returns 401 when there is no account email', async () => {
    const result = await supertest(app)
      .post('/sign-in')
      .send({ email: 'xx' + validBody.email, password: validBody.password });

    expect(result.status).toEqual(401);
  });

  test('returns 401 when there wrong password', async () => {
    const result = await supertest(app)
      .post('/sign-in')
      .send({ email: validBody.email, password: 'catchau' });

    expect(result.status).toEqual(401);
  });

  test('returns 200 with valid status and return token', async () => {
    const body = {
      email: validBody.email,
      password: validBody.password,
    };

    const result = await supertest(app).post('/sign-in').send(body);

    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty('token');
  });
});
