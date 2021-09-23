const jwt = require('jsonwebtoken')
const secret = require('./config').JWT_SECRET
const createError = require('./createError')


module.exports = (token) => {
  const decodedToken = jwt.verify(token, secret)
  if (!token || !decodedToken.username) {
    throw createError('Token Error', 'Token Error', 'token', 'Invalid or missing token.')
  }
  return decodedToken
}