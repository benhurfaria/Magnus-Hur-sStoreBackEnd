import connection from '../database.js';

async function signOut(req, res) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  try {
    await connection.query(
      `
            DELETE FROM sessions WHERE token = $1;
        `,
      [token]
    );
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
}

export { signOut };
