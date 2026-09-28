import { config } from "dotenv";
import { resolve } from "path";

export const NODE_ENV = process.env.NODE_ENV ?? "development";

config({
    path: resolve(`.env.${NODE_ENV}`)
});

export const PORT = parseInt(process.env.PORT ?? "9000");
export const DB_URI=process.env.DB_URI
export const ENC_KEY = Buffer.from(
    process.env.ENC_KEY,
    "hex"
)

export const IV_LENGTH = parseInt(
    process.env.IV_LENGTH ?? "16"
)

export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "1h";

export const REFRESH_EXPIRES_IN = process.env.REFRESH_EXPIRES_IN ?? "1y";

export const ACCESS_USER_TOKEN_SIGNATURE = process.env.ACCESS_USER_TOKEN_SIGNATURE;

export const ACCESS_ADMIN_TOKEN_SIGNATURE = process.env.ACCESS_ADMIN_TOKEN_SIGNATURE;

export const REFRESH_USER_TOKEN_SIGNATURE = process.env.REFRESH_USER_TOKEN_SIGNATURE;

export const REFRESH_ADMIN_TOKEN_SIGNATURE = process.env.REFRESH_ADMIN_TOKEN_SIGNATURE;

export const REDIS_URL = process.env.REDIS_URL;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;