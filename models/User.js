module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      unique: true,
      notNull :true
    },
    passwordHash: {
      type: DataTypes.STRING,
      notNull :true,
    },
    mail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      },
      notNull: true,
      unique: true
    }
  }, { timestamps: false })

  return User
}