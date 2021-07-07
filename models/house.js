'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class House extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      House.belongsTo(models.City, {
        as: 'city',
        foreignKey: {
          name: 'cityId',
        },
      })

      House.hasOne(models.Transaction, {
        as: 'transaction',
        foreignKey: {
          name: 'houseId',
        },
      })

      House.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'user',
      })

      House.hasMany(models.Image, {
        as: 'detailImages',
        foreignKey: 'houseId',
      })
    }
  }

  House.init(
    {
      name: DataTypes.STRING,
      cityId: DataTypes.INTEGER,
      ownerId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      price: DataTypes.INTEGER,
      typeRent: DataTypes.STRING,
      amenities: DataTypes.STRING,
      bedroom: DataTypes.INTEGER,
      bathroom: DataTypes.INTEGER,
      image: DataTypes.STRING,
      area: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'House',
      tableName: 'houses',
    }
  )

  return House
}
