/* eslint-disable no-console */
import { connection } from '../database.js';

async function cartItens(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  try {
    const user = await connection.query(` SELECT * FROM sessions
    JOIN usuario
    ON sessions."idUser" = usuario.id
    WHERE sessions.token = $1;`, [token]);
    if (user.rowCount === 0) {
      const itensRows = {
        qtd: user.rowCount,
        itens: user.rows,
      };
      return res.send(itensRows);
    }
    const cartitens = await connection.query(
      `SELECT cart.id AS "cartId", "idUser", "cartProducts".id AS "cartProductsId", "idProducts", name, "unitaryPrice", qtd, "imgeUrl", descrition 
          FROM cart JOIN "cartProducts" ON cart.id = "cartProducts"."idCart"                                                                                       
          JOIN products ON "cartProducts"."idProducts"=products.id WHERE cart."idUser"=$1;
          `,
      [user.rows[0].idUser],
    );
    const itensRows = {
      qtd: cartitens.rowCount,
      itens: cartitens.rows,
    };
    return res.status(200).send(itensRows);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}

export { cartItens };
