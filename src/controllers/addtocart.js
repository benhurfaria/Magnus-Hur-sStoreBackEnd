/* eslint-disable no-console */
import { connection } from '../database.js';

async function addtocart(req, res) {
  const id = Number(req.params.id);
  const productsInfo = req.body;
  try {
    const user = await connection.query('SELECT * FROM sessions WHERE sessions."idUser" = $1', [id]);
    if (user.rowCount === 0) {
      return res.status(404);
    }
    await connection.query('INSERT INTO cart("idUser") VALUES($1);', [id]);
    const idCart = await connection.query('SELECT *FROM cart WHERE cart."idUser" = $1;', [id]);
    await connection.query('INSERT INTO "cartProducts"("idCart", "idProducts", "unitaryPrice", qtd) VALUES($1,$2,$3,$4);', [idCart.rows[0].id, productsInfo.id, productsInfo.price, productsInfo.qtd]);
    return res.status(200);
  } catch (error) {
    return res.status(500);
  }
}
export { addtocart };
