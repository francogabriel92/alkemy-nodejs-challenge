const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}

const getToken = (req, res, next ) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    req.body.token = token
    next()
  } else {
    res.status(401).json({ error: 'Invalid token' })
  }
}

const errorHandler = (error, req, res, next) => {
  console.log(error)
  switch (error.name) {
  case 'DB Error': {
    if (error.type === 'unique violation') {
      error.field === 'mail' && res.status(400).json({ error: 'Mail already in use.' })
      error.field === 'PRIMARY' && res.status(400).json({ error: 'Username already in use.' })
    }
    if (error.type === 'Validation error') {
      error.field === 'mail' && res.status(400).json({ error: 'Invalid mail format.' })
      error.field === 'any' && res.status(400).json({ error: 'No empty fields are allowed.' })
    }
    if (error.type === '404') {
      error.field === 'character' && res.status(404).json({ error: 'No character found.' })
      error.field === 'movie' && res.status(404).json({ error: 'No movie found.' })
    }
    break
  }
  case 'Login Error': res.status(401).json({ error: 'Wrong credentials.' })
    break
  case 'Token Error': res.status(401).json({ error: error.message })
    break
  case 'JsonWebTokenError': res.status(401).json({ error: 'Invalid token' })
    break
  case 'TokenExpiredError': res.status(401).json({ error: error.message, 'expired at': error.expiredAt })
    break
  case 'SequelizeUniqueConstraintError': res.status(400).json({ error: 'Name must be unique.' })
    break
  case 'SequelizeValidationError': res.status(400).json({ error: error.errors[0].message })
    break
  default: {
    res.status(500).json(error).end()
    next(error)
    break
  }
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  getToken,
  errorHandler
}