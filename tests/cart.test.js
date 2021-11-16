/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable no-undef */
import supertest from 'supertest';
import { v4 as uuid } from 'uuid';
import '../src/setup.js';
// eslint-disable-next-line import/named
import app from '../src/app.js';
import { connection } from '../src/database.js';

beforeAll(async () => {
  await connection.query("insert into usuario(name,password, email) values('joa', '123456', 'al@g.com' );");
  const userId = await connection.query('select * from usuario;');
  const token = uuid();
  await connection.query('insert into sessions("idUser", token) values($1, $2);', [userId.rows[0].id, token]);
  await connection.query('insert into cart("idUser") values($1);', [userId.rows[0].id]);
  const cartId = await connection.query('select * from cart');
  await connection.query(`insert into products(name, price, descrition, "imgeUrl") values('teste', 1000, 'teste', 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg')`);
  const item = await connection.query('select * from products;');
  await connection.query('insert into "cartProducts"("idCart", "idProducts", "unitaryPrice", qtd) values($1, $2, $3, 1);', [cartId.rows[0].id, item.rows[0].id, item.rows[0].price]);
});
afterAll(async () => {
  await connection.query('DELETE FROM "cartProducts";');
  await connection.query('DELETE FROM cart;');
  await connection.query('DELETE FROM sessions;');
  await connection.query('DELETE FROM usuario;');
  await connection.query('DELETE FROM products;');
  connection.end();
});

describe('mostrar os itens do carrinho', () => {
  it('retorna 200', async () => {
    const item = await connection.query('select * from sessions;');
    const config = {
      headers: {
        Authorization: `Bearer ${item.rows[0].token}`,
      },
    };
    const result = await supertest(app).get('/cartitens').set(config);
    expect(result.status).toEqual(200);
  });
});

describe('add itens ao carrinho', () => {
  it('retorna 401 se o token for invalido', async () => {
    const config = {
      headers: {
        Authorization: '',
      },
    };
    const item = await connection.query('select * from products;');
    const body = {
      id: item.rows[0].id,
      price: 1000,
      qtd: 1,
    };
    const result = await supertest(app).post(`/addtocart`).set(config).send(body);
    expect(result.status).toEqual(401);
  });
  it('retorna 200 se inserir item no carrinho', async () => {
    const item = await connection.query('select * from sessions;');
    const products = await connection.query('select * from products;');
    const body = {
      id: products.rows[0].id,
      price: 1000,
      qtd: 1,
    };
    const result = await supertest(app).post('/addtocart').send(body).set("Authorization", `Bearer ${item.rows[0].token}`);
    expect(result.status).toEqual(200);
  }, 60000);
});

describe('remover itens do carrinho', () => {
  it('retorna 200 quando remover iten do carrinho', async () => {
    const item = await connection.query('select * from products;');
    const result = await supertest(app).delete(`/remove/${item.rows[0].id}`);
    expect(result.status).toEqual(200);
  }, 30000);
});
