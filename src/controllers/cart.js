import connection from '../database.js';

async function addToCart(req, res) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  const { price, quant, id } = req.body;
  try {
    let user = await connection.query(
      `
            SELECT usuario.* FROM usuario
            JOIN sessions
                ON sessions."idUser" = usuario.id
            WHERE token = $1;`,
      [token]
    );
    user = user.rows[0];
    let cart = await connection.query(
      `SELECT * FROM cart WHERE "idUser" = $1;`,
      [user.id]
    );

    if (!cart.rowCount) {
      await connection.query(`INSERT INTO cart ("idUser") VALUES ($1);`, [
        user.id,
      ]);
      cart = await connection.query(`SELECT * FROM cart WHERE "idUser" = $1;`, [
        user.id,
      ]);
    }

    cart = cart.rows[0];

    if (user) {
      await connection.query(
        `
                INSERT INTO "cartProducts"
                    ("idProducts", "unitaryPrice", qtd, "idCart")
                VALUES
                    ($1, $2, $3, $4);
            `,
        [id, price, quant, cart.id]
      );
    }

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send({ message: 'O banco de dados está offline' });
  }
}

export { addToCart };
