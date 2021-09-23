const movieRouter = require('express').Router()
const movieService = require('../services/movie')
const verifyToken = require('../utils/verifyToken')

movieRouter.get('/', async (req, res, next) => {
  try {
    verifyToken(req.body.token)
    const queryParams = req.query
    if(queryParams && Object.keys(queryParams).length !== 0) {
      const queryResponse = await movieService.get(queryParams)
      if (queryResponse.length === 0) res.status(404).json({ error: 'No movie found.' })
      res.status(200).json(queryResponse)
    } else {
      const queryResponse = await movieService.getAll()
      res.status(200).json(queryResponse)
    }
  }
  catch (error) {
    next(error)
  }
})

movieRouter.post('/', async (req, res, next) => {
  const body = req.body
  try {
    verifyToken(body.token)
    const newMovie = {
      name: body.name,
      imageUrl: body.imageUrl,
      rating: body.rating,
      createDate: new Date(body.createDate),
      genre: { name: body.genre }
    }
    const response = await movieService.create(newMovie)
    if ( response instanceof Error ) throw response
    res.status(200).json(response)
  }
  catch (error) {
    next(error)
  }
})

movieRouter.put('/', async (req, res, next) => {
  const body = req.body
  try {
    verifyToken(body.token)
    const movie = {
      name: body.name.toLowerCase(),
      imageUrl: body.imageUrl,
      rating: body.rating,
      createDate: body.createDate,
      genre: { name: body.genre }
    }
    const movieToUpdate = await movieService.update(movie)
    if (movieToUpdate instanceof Error) throw movieToUpdate
    res.status(200).json(movieToUpdate)
  }
  catch (error) {
    next(error)
  }
})

movieRouter.delete('/', async (req, res, next) => {
  try {
    verifyToken(req.body.token)
    if(!req.body.name) res.status(400).json({ error: 'Name is required to delete a movie' })
    const movieToDelete = await movieService.erase(req.body.name)
    if( movieToDelete instanceof Error) throw movieToDelete
    res.status(200).json(movieToDelete)
  }
  catch (error) {
    next(error)
  }
})

module.exports = movieRouter