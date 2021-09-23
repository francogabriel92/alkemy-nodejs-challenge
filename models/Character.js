module.exports = (sequelize, DataTypes) => {

  const Character = sequelize.define('Character', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      notNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      }
    },
    name: {
      type: DataTypes.STRING,
      notNull :true,
      unique: true
    },
    age: DataTypes.INTEGER,
    weight: DataTypes.DECIMAL(6,2),
    history: DataTypes.TEXT,
  }, { timestamps: false })

  Character.associate = (models) => {
    Character.belongsToMany(models.Movie, { through: 'Movie_Character' })
  }
  return Character
}