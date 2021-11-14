/* eslint-disable no-undef */
import supertest from 'supertest';
import app from '../src/app.js';

describe('mostrar os itens do carrinho', () => {
  it('retorna 200', async () => {
    const body = {
      id: 1,
    };
    const result = await supertest(app).get('/cartitens').send(body);
    expect(result.status).toEqual(200);
  });
  it('retorna 404', async () => {
    const body = {
      id: 2,
    };
    const result = await supertest(app).get('/cartitens').send(body);
    expect(result.status).toEqual(404);
  });
});
