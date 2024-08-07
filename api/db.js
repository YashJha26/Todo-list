import pg from "pg";
import dotenv from 'dotenv';
dotenv.config();

const Pool=pg.Pool

const pool= new Pool({
   user:process.env.USERNAME_POSTGRES,
    host:process.env.HOST,
    database:process.env.DB,
    password:process.env.PASSWORD,
    port:process.env.DBPORT,
    ssl: {
        rejectUnauthorized: false
      }
})

export default pool;
