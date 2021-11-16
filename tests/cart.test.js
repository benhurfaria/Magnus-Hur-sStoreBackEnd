/* eslint-disable quotes */
/* eslint-disable no-undef */
import supertest from 'supertest';
import '../src/setup.js';
import { app } from '../src/app.js';
import { connection } from '../src/database.js';

beforeAll(async () => {
  await connection.query("insert into usuario(name,password, email) values('joa', '123456', 'joat@gmail.com' );");
  const userId = await connection.query('select * from usuario;');
  await connection.query('insert into cart("idUser") values($1);', [userId.rows[0].id]);
  const cartId = await connection.query('select * from cart');
  await connection.query(`insert into products(name, price, descrition, "imgeUrl") values('teste', 1000, 'teste', 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg')`);
  const item = await connection.query('select * from products;');
  await connection.query('insert into "cartProducts"("idCart", "idProducts", "unitaryPrice", qtd) values($1, $2, $3, 1);', [cartId.rows[0].id, item.rows[0].id, item.rows[0].price]);
});
afterAll(async () => {
  await connection.query('DELETE FROM "cartProducts";');
  await connection.query('DELETE FROM cart;');
  await connection.query('DELETE FROM usuario;');
  await connection.query('DELETE FROM products;');
  connection.end();
});

describe('mostrar os itens do carrinho', () => {
  it('retorna 200', async () => {
    const id = 14;
    const result = await supertest(app).get(`/cartitens/${id}`);
    expect(result.status).toEqual(200);
  });
});

describe('remover itens do carrinho', () => {
  it('retorna 200 quando remover iten do carrinho', async () => {
    const id = 31;
    const result = await supertest(app).delete(`/remove/${id}`);
    expect(result.status).toEqual(200);
  });
});
