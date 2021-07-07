'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Transaction, {
        as: 'transaction',
        foreignKey: {
          name: 'userId',
        },
      })

      User.hasMany(models.House, {
        as: 'houses',
        foreignKey: 'ownerId',
      })
    }
  }

  User.init(
    {
      fullname: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      listAs: DataTypes.STRING,
      gender: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      avatar: DataTypes.STRING,
      profileImage: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'User',
      tableName: 'users',
    }
  )

  return User
}
