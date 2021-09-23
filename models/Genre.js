module.exports = (sequelize, DataTypes) => {

  const Genre = sequelize.define('Genre', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      notNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      isUrl: true,
    },
    name: {
      type: DataTypes.STRING,
      notNull: true
    },
  }, { timestamps: false })

  Genre.associate = (models) => {
    Genre.belongsToMany(models.Movie, { through: 'Movie_Genre' } )
  }

  return Genre
}