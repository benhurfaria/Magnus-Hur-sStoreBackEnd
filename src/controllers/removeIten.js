/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { connection } from '../database.js';

async function removeIten(req, res) {
  const id = Number(req.params.id);
  try {
    const cartId = await connection.query(
      'SELECT "cartProducts"."idCart" FROM "cartProducts" WHERE "cartProducts".id = $1;',
      [id],
    );
    const deleted = await connection.query(
      'DELETE FROM "cartProducts" WHERE "cartProducts".id = $1;',
      [id],
    );
    const cart = await connection.query('SELECT * FROM "cartProducts";');
    if (cart.rowCount === 0) {
      await connection.query('DELETE FROM cart WHERE cart.id = $1', [
        cartId.rows[0].idCart,
      ]);
    }
    return res.status(200).send(deleted);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export { removeIten };
