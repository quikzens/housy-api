'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      City.hasOne(models.House, {
        as: 'house',
        foreignKey: {
          name: 'city_id',
        },
      })
    }
  }

  City.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'City',
      tableName: 'cities',
    }
  )

  return City
}
