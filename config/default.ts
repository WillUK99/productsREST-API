import dotenv from 'dotenv'

dotenv.config()

export default {
  port: 1337,
  host: 'localhost',
  dbUri: process.env.DB_URI,
  saltWorkFactor: 10,
  accessTokenTtl: '15m',
  refreshTokenTtl: '1y',
  accessTokenPrivateKey: process.env.JWT_PRIVATE_ACCESS_KEY,
  accessTokenPublicKey: process.env.JWT_PUBLIC_ACCESS_KEY,
  refreshTokenPrivateKey: process.env.JWT_PRIVATE_REFRESH_KEY,
  refreshTokenPublicKey: process.env.JWT_PUBLIC_REFRESH_KEY,
}