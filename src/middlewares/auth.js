import { connection } from '../database.js';

async function authToken(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.sendStatus(401);
  }

  const searchUser = await connection.query(
    `
        SELECT *
        FROM usuario
            JOIN sessions
                ON usuario.id = sessions."idUser"
        WHERE sessions.token = $1;
    `,
    [token],
  );

  if (!searchUser) {
    return res.sendStatus(401);
  }

  return next();
}
export { authToken };
