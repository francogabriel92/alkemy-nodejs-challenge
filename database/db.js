'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const modelDir = path.resolve(__dirname, '../models')  // Change when finish testing sequelize
const config = require('../utils/config')
const logger = require('../utils/logger')
const db = {}

let sequelize = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: 'mysql'
})


fs
  .readdirSync(modelDir)
  .filter(file => {
    return (file.indexOf('.') !== 0)  && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    const model = require(path.join(modelDir, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.connect = async () => {
  try {
    await sequelize.sync({ force: false })
    logger.info('Connection to database has been done successfully')

  }
  catch (error) {
    logger.error('Error while connecting to database: ', error)
  }
}

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db