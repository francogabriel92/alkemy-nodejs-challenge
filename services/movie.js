const Movie = require('../database/db').Movie
const Genre = require('../database/db').Genre
const Character = require('../database/db').Character
const genreService = require('./genre')
const createError = require('../utils/createError')

const getAll = async () => {
  try {
    const movies = await Movie.findAll({
      attributes: [
        'imageUrl',
        'name',
        'createDate'
      ]
    })
    const moviesToSend = movies.map( i => i.dataValues )
    return moviesToSend
  }
  catch (error) {
    return error
  }
}

const get = async ( params ) => {
  try {
    const whereCondition = {}
    if(params.name) whereCondition.name = params.name

    const associateWhereCondition = {}
    if(params.genre) associateWhereCondition.id = params.genre

    let orderCondition = []
    if(params.order && (params.order === 'ASC' || params.order === 'DESC' )) orderCondition = [ 'createDate', params.order ]

    console.log('orderCondition = ' + orderCondition)
    const queryResult = Movie.findAll({
      where: whereCondition,
      include: [{
        model: Genre,
        attributes: ['name'],
        through: { attributes: [] },
        where: associateWhereCondition
      },
      {
        model: Character,
        attributes: ['name'],
        through: { attributes: [] },
      }],
      order: orderCondition.length !== 0 ? [ orderCondition ] : undefined
    })
    return queryResult
  }
  catch (error) {
    return error
  }
}

const create = async (newMovie) => {
  try {
    const [ movie, created ] = await Movie.findOrCreate({
      where: { name: newMovie.name }
    })
    if(created) {
      movie.imageUrl = newMovie.imageUrl
      movie.rating = newMovie.rating
      movie.createDate = newMovie.createDate
      await movie.save()
    }
    if ( newMovie.genre ) {
      const genre = await genreService.create(newMovie.genre)
      await movie.addGenre(genre)
    }
    return movie
  }
  catch (error) {
    return error
  }
}

const update = async (movie) => {
  try {
    const movieToUpdate = await Movie.findOne({
      where: { name: movie.name },
      include: [{
        model: Genre,
        attributes: ['name'],
        through: { attributes: [] }
      }]
    })
    if (movieToUpdate === null) throw createError('DB Error', '404', 'movie')
    if (movie.imageUrl) movieToUpdate.imageUrl = movie.imageUrl
    if (movie.createDate) movieToUpdate.createDate = movie.createDate
    if (movie.rating) movieToUpdate.rating = movie.rating

    const updatedmovie = await movieToUpdate.save()
    return updatedmovie
  }
  catch (error) {
    return error
  }
}

const erase = async (name) => {
  try {
    const movieToDelete = await Movie.findOne({ where: { name: name } })
    if (movieToDelete === null) throw createError('DB Error', '404', 'movie')
    await movieToDelete.destroy()
    return movieToDelete
  }
  catch (error) {
    return(error)
  }
}


const movieService = {
  getAll,
  get,
  create,
  update,
  erase
}

module.exports = movieService