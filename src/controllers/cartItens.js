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
    if (cartitens.rowCount === 0) {
      return res.status(404).send('sem itens');
    }
    let qtd = 0;
    cartitens.rows.forEach((iten) => {
      qtd += iten.qtd;
    });
    const itensRows = {
      qtd,
      itens: cartitens.rows,
    };
    return res.status(200).send(itensRows);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export { cartItens };
