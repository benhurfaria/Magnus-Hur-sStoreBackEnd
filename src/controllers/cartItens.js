/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { connection } from '../database.js';

async function cartItens(req, res) {
  const id = Number(req.params.id);
  try {
    const cartitens = await connection.query(
      `SELECT cart.id AS "cartId", "idUser", "cartProducts".id AS "cartProductsId", "idProducts", name, "unitaryPrice", qtd, "imgeUrl", descrition 
          FROM cart JOIN "cartProducts" ON cart.id = "cartProducts"."idCart"                                                                                       
          JOIN products ON "cartProducts"."idProducts"=products.id WHERE cart."idUser"=$1;
          `,
      [id],
    );
    const itensRows = {
      qtd: cartitens.rowCount,
      itens: cartitens.rows,
    };
    return res.status(200).send(itensRows);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export { cartItens };
