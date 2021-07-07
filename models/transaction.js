'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.House, {
        as: 'house',
        foreignKey: {
          name: 'houseId',
        },
      })

      Transaction.belongsTo(models.User, {
        as: 'user',
        foreignKey: {
          name: 'userId',
        },
      })
    }
  }

  Transaction.init(
    {
      checkIn: DataTypes.STRING,
      checkOut: DataTypes.STRING,
      houseId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      status: DataTypes.STRING,
      attachment: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Transaction',
      tableName: 'transactions',
    }
  )

  return Transaction
}
