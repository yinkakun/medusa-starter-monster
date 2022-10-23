const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
if (process.env.NODE_ENV === "production") {
  ENV_FILE_NAME = ".env.production";
}

if (process.env.NODE_ENV === "staging") {
  ENV_FILE_NAME = ".env.staging";
}

if (process.env.NODE_ENV === "test") {
  ENV_FILE_NAME = ".env.test";
}

if (process.env.NODE_ENV === "development") {
  ENV_FILE_NAME = ".env";
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

const ADMIN_CORS = process.env.ADMIN_CORS;
const STORE_CORS = process.env.STORE_CORS;

const REDIS_URL = process.env.REDIS_URL;
const DATABASE_URL = process.env.DATABASE_URL;

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

const S3_BUCKET_URL = process.env.S3_BUCKET_URL;
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
const S3_BUCKET_REGION = process.env.S3_BUCKET_REGION;
const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID;
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;

const plugins = [
  `medusa-payment-manual`,
  `medusa-fulfillment-manual`,
  {
    resolve: `medusa-file-s3`,
    options: {
      s3_url: S3_BUCKET_URL,
      bucket: S3_BUCKET_NAME,
      region: S3_BUCKET_REGION,
      access_key_id: S3_ACCESS_KEY_ID,
      secret_access_key: S3_SECRET_ACCESS_KEY,
    },
  },
];

module.exports = {
  projectConfig: {
    redis_url: REDIS_URL,
    database_type: "postgres",
    database_url: DATABASE_URL,
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
    jwt_secret: JWT_SECRET,
    cookie_secret: COOKIE_SECRET,
  },
  plugins,
};
