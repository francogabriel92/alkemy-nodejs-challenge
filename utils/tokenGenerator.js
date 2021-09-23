const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./config')

module.exports = (user, rememberMe) => {
  const token = jwt.sign(user, JWT_SECRET, {
    expiresIn: rememberMe ? '8760h' : '1h'
  })
  return token
}