'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.House, {
        foreignKey: 'houseId',
        as: 'house',
      })
    }
  }

  Image.init(
    {
      url: DataTypes.STRING,
      houseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Image',
      tableName: 'images',
    }
  )

  return Image
}
