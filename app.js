const express = require('express')
const app = express()
const db = require('./database/db')
const middleware = require('./utils/middleware')
const cors = require('cors')
const authRouter = require('./controllers/auth')
const characterRouter = require('./controllers/character')
const movieRouter = require('./controllers/movie')
const populateDb = require('./utils/populate')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./docs/swagger.json')

db.connect()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(middleware.requestLogger)

app.use('/auth', authRouter)
app.use('/characters', middleware.getToken, characterRouter)
app.use('/movies', middleware.getToken, movieRouter)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// For testing purpouse only, when database is empty this endpoint will fill it with some character, movie and genre data
app.get('/populate', async (req, res) => {
  await populateDb()
  res.status(200).send('<h1 style="text-align: center">DB populated successfully</h1>')
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app