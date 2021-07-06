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
          name: 'city_id',
        },
      })

      House.hasOne(models.Transaction, {
        as: 'transaction',
        foreignKey: {
          name: 'house_id',
        },
      })

      House.belongsTo(models.User, {
        foreignKey: 'owner_id',
        as: 'user',
      })
    }
  }

  House.init(
    {
      name: DataTypes.STRING,
      city_id: DataTypes.INTEGER,
      owner_id: DataTypes.INTEGER,
      address: DataTypes.STRING,
      price: DataTypes.INTEGER,
      type_rent: DataTypes.STRING,
      amenities: DataTypes.STRING,
      bedroom: DataTypes.INTEGER,
      bathroom: DataTypes.INTEGER,
      image: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
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
