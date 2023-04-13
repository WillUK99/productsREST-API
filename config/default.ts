import dotenv from 'dotenv'

dotenv.config()

export default {
  port: 1337,
  host: 'localhost',
  dbUri: process.env.DB_URI,
  saltWorkFactor: 10,
}