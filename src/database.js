import pg from 'pg';

const { Pool } = pg;

// const databaseConfig = {
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// }

const databaseConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_NAME,
};

const connection = new Pool(databaseConfig);

// const database = {
//   user: 'postgres',
//   password: '123456',
//   host: 'localhost',
//   port: 5432,
//   database: 'magnusandhurs',
// };

// const connection = new Pool(database);

export default connection;
