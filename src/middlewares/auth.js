import { connection } from '../database.js';
import jwt from 'jsonwebtoken';

async function authToken(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.sendStatus(401);
  }

  const key = process.env.JWT_SECRET;
  try {
    const validateToken = jwt.verify(token, key);
  } catch (error) {
    return res.sendStatus(401);
  }
  try {
    const searchUser = await connection.query(
      `
        SELECT *
        FROM usuario
            JOIN sessions
                ON usuario.id = sessions."idUser"
        WHERE sessions.token = $1;
    `, [token],
    );

    if (!searchUser) {
      return res.sendStatus(401);
    }

    return next();
  } catch (error) {
    return res.status(500).send({ message: 'O banco de dados está offline' });
  }
}
export { authToken };
