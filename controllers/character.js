const characterRouter = require('express').Router()
const characterService = require('../services/character')
const verifyToken = require('../utils/verifyToken')

characterRouter.get('/', async (req, res, next) => {
  try {
    verifyToken(req.body.token)
    const queryParams = req.query
    if(queryParams && Object.keys(queryParams).length !== 0) {
      const queryResponse = await characterService.get(queryParams)
      if (queryResponse.length === 0) res.status(404).json({ error: 'No character found.' })
      res.status(200).json(queryResponse)
    } else {
      const queryResponse = await characterService.getAll()
      res.status(200).json(queryResponse)
    }
  }
  catch (error) {
    next(error)
  }
})

characterRouter.post('/', async (req, res, next) => {
  const body = req.body
  try {
    verifyToken(body.token)
    const character = {
      name: body.name,
      imageUrl: body.imageUrl,
      age: body.age,
      weight: body.weight,
      history: body.history,
      movies: body.movies
    }
    const queryResponse = await characterService.create(character)
    if (queryResponse instanceof Error) {
      throw queryResponse
    }
    res.status(200).json(queryResponse)
  }
  catch (error) {
    next(error)
  }
})

characterRouter.put('/', async (req, res, next) => {
  const body = req.body
  try {
    verifyToken(body.token)
    const character = {
      name: body.name.toLowerCase(),
      imageUrl: body.imageUrl,
      age: body.age,
      weight: body.weight,
      history: body.history,
      movies: body.movies
    }
    const characterToUpdate = await characterService.update(character)
    if (characterToUpdate instanceof Error) throw characterToUpdate
    res.status(200).json(characterToUpdate)
  }
  catch (error) {
    next(error)
  }
})

characterRouter.delete('/', async (req, res, next) => {
  try {
    verifyToken(req.body.token)
    if(!req.body.name) res.status(400).json({ error: 'Name is required to delete a character' })
    const characterToDelete = await characterService.erase(req.body.name)
    if( characterToDelete instanceof Error) throw characterToDelete
    res.status(200).json(characterToDelete)
  }
  catch (error) {
    next(error)
  }
})

module.exports = characterRouter