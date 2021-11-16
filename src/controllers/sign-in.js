/* eslint-disable no-console */
import bcrypt from 'bcrypt';
// eslint-disable-next-line import/no-unresolved
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { connection } from '../database.js';
import { signInSchema } from '../../schemas/userSchema.js';

async function signIn(req, res) {
  const validate = signInSchema.validate(req.body);

  if (validate.error) {
    res.sendStatus(400);
    return;
  }

  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await connection.query(
      `
            SELECT * FROM usuario WHERE email = $1;
        `,
      [email],
    );

    if (user.rowCount === 0) {
      res.sendStatus(401);
      return;
    }

    const encryptedPassword = user.rows[0].password;
    if (!bcrypt.compareSync(password, encryptedPassword)) {
      res.sendStatus(401);
      return;
    }

    const idUser = user.rows[0].id;
    const key = process.env.JWT_SECRET;
    const config = { expiresIn: 60 * 60 * 24 * 2 }; // 2 dias em segundos

    const token = jwt.sign(idUser, key, config);

    await connection.query('DELETE FROM sessions WHERE "idUser" = $1;', [
      idUser,
    ]);

    await connection.query(
      `
            INSERT INTO sessions ("idUser", token) VALUES ($1, $2);
        `,
      [idUser, token],
    );

    res.status(200).send({
      token,
      id: user.rows[0].id,
    });
  } catch (error) {
    // eslint-disable-next-line consistent-return
    return res.status(500).send({ message: 'O banco de dados está offline' });
  }
}

export { signIn };
