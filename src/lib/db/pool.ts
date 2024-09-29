import { Pool } from 'pg';
import config from '../../config/db.config';

const pool = new Pool({
  user: config.username,
  host: config.host,
  database: config.database,
  password: config.password,
  port: Number(config.port),
});

export default pool;
