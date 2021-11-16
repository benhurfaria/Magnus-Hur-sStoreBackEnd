/* eslint-disable quotes */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
import { connection } from '../database.js';

async function sales(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');
  const { itens } = req.body;
  console.log(itens);
  try {
    if (!token) return res.sendStatus(401);
    const user = await connection.query(` SELECT * FROM sessions
    JOIN usuario
    ON sessions."idUser" = usuario.id
    WHERE sessions.token = $1;`, [token]);
    await connection.query('INSERT INTO sales("idUser", date) VALUES($1, now());', [user.rows[0].idUser]);
    const idSale = await connection.query('SELECT *FROM sales WHERE sales."idUser" = $1;', [user.rows[0].idUser]);
    for (let i = 0; i < itens.length; i += 1) {
      await connection.query(`INSERT INTO "salesProducts"("idSales", "idProducts", "unitaryPrice", qtd) VALUES($1,$2,$3,$4);`, [idSale.rows[0].id, itens[i].idProducts, itens[i].unitaryPrice, itens[0].qtd]);
    }
    await connection.query('DELETE FROM "cartProducts";');
    await connection.query('DELETE FROM cart;');
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
export { sales };
