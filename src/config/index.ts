import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  // forntend_url: 'http://localhost:3000',
  // backend_url: 'http://localhost:5000/api/v1',
  forntend_url: 'https://excellence-builders-frontend.vercel.app',
  backend_url: 'https://excellence-builders-backend.vercel.app/api/v1',
  ssl_store_id: process.env.SSL_STORE_ID,
  ssl_store_password: process.env.SSL_STORE_PASSWORD,
  ssl_is_live: false,
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
};
