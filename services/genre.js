const Genre = require('../database/db').Genre

const create = async (genre) => {
  try {
    const [ createdGenre, created ] = await Genre.findOrCreate({ where: { name: genre.name } })
    if (created) createdGenre.imageUrl = genre.imageUrl
    return createdGenre
  }
  catch (error) {
    return error
  }
}

const genreService = {
  create
}

module.exports = genreService