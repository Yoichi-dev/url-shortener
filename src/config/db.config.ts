import dotenv from 'dotenv';

dotenv.config();

export default {
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || "postgre",
  password: process.env.DB_PASSWORD || "postgre",
  database: process.env.DB_DATABASE || "urlshortener",
};
