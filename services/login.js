const User = require('../database/db').User
const bcrypt = require('bcrypt')
const createError = require('../utils/createError')
const tokenGenerator = require('../utils/tokenGenerator')

const login = async (username, password, rememberMe) => {
  try {
    const queryResponse = await User.findAll({
      where: { username }
    })
    if(!(username && password && queryResponse === undefined)) {
      throw createError('Login Error', 'Login error','any', 'Wrong credentials')
    }
    const user = queryResponse[0].dataValues
    if ( await bcrypt.compare(password,user.passwordHash )) {
      const token = tokenGenerator(user, rememberMe)
      const loggedUser = {
        username: user.username,
        token
      }
      return loggedUser
    }
  }
  catch (error) {
    return error
  }
}

const loginService = { login }

module.exports = loginService