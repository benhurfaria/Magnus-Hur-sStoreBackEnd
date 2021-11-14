/* eslint-disable no-undef */
import supertest from 'supertest';
import '../src/setup.js';
import { app } from '../src/app.js';
import { connection } from '../src/database.js';

beforeAll(async () => {
  // await connection.query("insert into usuario(name,password, email) values('joa', '123456', 'jt@gmail.com' );");
  // await connection.query('insert into cart("idUser") values(14);');
  await connection.query('insert into "cartProducts"("idCart", "idProducts", "unitaryPrice", qtd) values(14, 4, 2600, 1);');
});

describe('mostrar os itens do carrinho', () => {
  it('retorna 200', async () => {
    const id = 14;
    const result = await supertest(app).get(`/cartitens/${id}`);
    expect(result.status).toEqual(200);
  });
  it('retorna 404', async () => {
    const id = 12;
    const result = await supertest(app).get(`/cartitens/${id}`);
    expect(result.status).toEqual(404);
  });
});

describe('remover itens do carrinho', () => {
  it('retorna 200 quando remover iten do carrinho', async () => {
    const id = 31;
    const result = await supertest(app).delete(`/remove/${id}`);
    expect(result.status).toEqual(200);
  });
});
