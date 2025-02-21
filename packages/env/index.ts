import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, ".env") });

export const env = {
    DATABASE_URL: process.env.DATABASE_URL,
    AES_KEY_HEX: process.env.AES_KEY_HEX,
    HMAC_KEY: process.env.HMAC_KEY,
}