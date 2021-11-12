import pg from 'pg';

const { Pool } = pg;

// const databaseConfig = {
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     }
// }

// const connection = new Pool(databaseConfig);

const database ={
    user: 'postgres',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'magnusandhurs'
}

const connection = new Pool(database)

export default connection;