const Character = require('../database/db').Character
const Movie = require('../database/db').Movie
const movieService = require('./movie')
const createError = require('../utils/createError')

const getAll = async () => {
  try {
    const characters = await Character.findAll({
      attributes: [
        'imageUrl',
        'name'
      ]
    })
    const charactersToSend = characters.map( i => i.dataValues )
    return charactersToSend
  }
  catch (error) {
    return error
  }
}

const get = async ( params ) => {
  try {
    const whereCondition = {}
    if(params.name) whereCondition.name = params.name
    if(params.age) whereCondition.age = params.age

    const associateWhereCondition = {}
    if(params.movies) associateWhereCondition.id = params.movies

    const queryResult = Character.findAll({
      where: whereCondition,
      include: [{
        model: Movie,
        attributes: ['name'],
        through: { attributes: [] },
        where: associateWhereCondition
      }]
    })
    return queryResult
  }
  catch (error) {
    return error
  }
}

const create = async (newCharacter) => {
  try {
    newCharacter.name = newCharacter.name.toLowerCase()
    const createdCharacter = await Character.create( newCharacter, {
      include: Movie
    })

    for ( const m of newCharacter.movies ) {
      const movie = await movieService.create({ name: m })
      await createdCharacter.addMovie(movie)
    }

    const result = await Character.findOne({
      where: { name: newCharacter.name },
      include: [{
        model: Movie,
        attributes: ['name'],
        through: { attributes: [] }
      }]
    })
    return result
  }
  catch (error) {
    return(error)
  }
}

const update = async (character) => {
  try {
    const characterToUpdate = await Character.findOne({
      where: { name: character.name },
      include: [{
        model: Movie,
        attributes: ['name'],
        through: { attributes: [] }
      }]
    })
    if (characterToUpdate === null) throw createError('DB Error', '404', 'character')
    if (character.imageUrl) characterToUpdate.imageUrl = character.imageUrl
    if (character.age) characterToUpdate.age = character.age
    if (character.weight) characterToUpdate.weight = character.weight
    if(character.history) characterToUpdate.history = character.history

    const updatedCharacter = await characterToUpdate.save()
    return updatedCharacter
  }
  catch (error) {
    return error
  }
}

const erase = async (name) => {
  try {
    const characterToDelete = await Character.findOne({ where: { name: name } })
    if (characterToDelete === null) throw createError('DB Error', '404', 'character')
    await characterToDelete.destroy()
    return characterToDelete
  }
  catch (error) {
    return(error)
  }
}

const characterService = {
  getAll,
  get,
  create,
  update,
  erase
}

module.exports = characterService