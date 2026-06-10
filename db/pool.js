import { Pool } from "pg";

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USERNAME,
  database: process.env.DATABASE,
  // password: process.env.PASSWORD,
  port: process.env.PORT,
});

export default pool;
