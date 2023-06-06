/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {    
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID,
    NAVER_CLIENT_SECRET: process.env.NAVER_CLIENT_SECRET,
    NAVER_API_URL: process.env.NAVER_API_URL,
    OXFORD_CLIENT_ID: process.env.OXFORD_CLIENT_ID,
    OXFORD_CLIENT_KEY: process.env.OXFORD_CLIENT_KEY,
    OXFORD_API_URL: process.env.OXFORD_API_URL
  }
}

module.exports = nextConfig
