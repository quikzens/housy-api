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
          name: 'house_id',
        },
      })

      Transaction.belongsTo(models.User, {
        as: 'user',
        foreignKey: {
          name: 'user_id',
        },
      })
    }
  }

  Transaction.init(
    {
      check_in: DataTypes.STRING,
      check_out: DataTypes.STRING,
      house_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      status: DataTypes.STRING,
      attachment: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
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
