require('dotenv').config()

const PORT = process.env.PORT
const DB_USERNAME = process.env.DB_USERNAME
const DB_NAME = process.env.DB_NAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const JWT_SECRET = process.env.JWT_SECRET
const SENDGRID_API = process.env.SENDGRID_API

module.exports = {
  PORT,
  DB_USERNAME,
  DB_NAME,
  DB_PASSWORD,
  DB_HOST,
  JWT_SECRET,
  SENDGRID_API,
}