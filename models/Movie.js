module.exports = (sequelize, DataTypes) => {

  const Movie = sequelize.define('Movie', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      notNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      isUrl: true
    },
    name: {
      type: DataTypes.STRING,
      notNull: true,
      required: true,
      unique: true
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      }
    },
    createDate: {
      type: DataTypes.DATE
    }
  }, { timestamps: false })

  Movie.associate = (models) => {
    Movie.belongsToMany(models.Character, { through: 'Movie_Character' })
    Movie.belongsToMany(models.Genre, { through: 'Movie_Genre' })
  }

  return Movie
}