const User = require('../database/db').User
const { ValidationError } = require('sequelize')
const bcrypt = require('bcrypt')
const createError = require('../utils/createError')

const create = async (username, password, mail, next) => {
  try {
    if(!(username && password && mail)) {
      throw createError('DB Error', 'Validation error', 'any', 'No empty fields are allowed.')
    }
    const createdUser = await User.create({
      username,
      passwordHash: await bcrypt.hash(password, 10),
      mail
    })
    const user = {
      username: createdUser.username,
      password: createdUser.passwordHash,
      mail: createdUser.mail
    }
    return user
  }
  catch (error) {
    if(error instanceof ValidationError){
      return createError('DB Error', error.errors[0].type, error.errors[0].path, error.errors[0].message)
    }
    next(error)
  }
}

const userService = { create }

module.exports = userService