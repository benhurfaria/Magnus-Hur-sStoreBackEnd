/* eslint-disable no-console */
import { connection } from '../database.js';

async function addtocart(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  const productsInfo = req.body;
  try {
    if (!token) return res.sendStatus(401);
    const user = await connection.query(` SELECT * FROM sessions
    JOIN usuario
    ON sessions."idUser" = usuario.id
    WHERE sessions.token = $1;`, [token]);
    await connection.query('INSERT INTO cart("idUser") VALUES($1);', [user.rows[0].idUser]);
    const idCart = await connection.query('SELECT *FROM cart WHERE cart."idUser" = $1;', [user.rows[0].idUser]);
    await connection.query('INSERT INTO "cartProducts"("idCart", "idProducts", "unitaryPrice", qtd) VALUES($1,$2,$3,$4);', [idCart.rows[0].id, productsInfo.id, productsInfo.price, productsInfo.qtd]);
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500);
  }
}
export { addtocart };
