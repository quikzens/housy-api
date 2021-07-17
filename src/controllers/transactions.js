const { Transaction, House, City, User } = require('../../models')
const { Op } = require('sequelize')
const { or } = Op
const path = process.env.PATH_FILE

exports.addTransaction = async (req, res) => {
  let transactionData = req.body
  const { idUser } = req

  // change amenities type, so it fits in database
  transactionData = {
    ...transactionData,
    userId: idUser,
    status: 'Waiting Payment',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  try {
    const checkHouse = await House.findOne({
      where: { id: transactionData.houseId },
    })
    if (!checkHouse) {
      return res.send({
        message: `Tidak ada house dengan id ${transactionData.houseId}`,
      })
    }

    const checkUser = await User.findOne({
      where: { id: transactionData.userId },
    })
    if (!checkUser) {
      return res.send({
        message: `Tidak ada user dengan id ${transactionData.userId}`,
      })
    }

    transactionData = {
      ...transactionData,
      ownerId: checkHouse.ownerId,
    }

    let transaction = await Transaction.create(transactionData)

    transaction = await Transaction.findOne({
      where: {
        id: transaction.id,
      },
      include: [
        {
          model: House,
          as: 'house',
          include: [
            {
              model: City,
              as: 'city',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
            {
              model: User,
              as: 'user',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],
              },
            },
          ],
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'cityId', 'ownerId'],
          },
        },
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'houseId', 'userId'],
      },
    })

    // change amenities type, so it fits in frontend
    transaction = JSON.parse(JSON.stringify(transaction))
    transaction = {
      ...transaction,
      house: {
        ...transaction.house,
        amenities: transaction.house.amenities.split(','),
      },
    }

    res.send({
      status: 'success',
      message: 'resources has successfully added',
      data: transaction,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'failed',
      message: 'internal server error',
    })
  }
}

exports.editTransaction = async (req, res) => {
  const id = req.params.id

  let newTransaction = req.body
  newTransaction = {
    ...newTransaction,
    updatedAt: new Date(),
  }

  try {
    if (newTransaction.hasOwnProperty('houseId')) {
      const checkHouse = await House.findOne({
        where: { id: newTransaction.houseId },
      })
      if (!checkHouse) {
        return res.send({
          message: `Maaf, tidak ada house dengan id ${newTransaction.houseId}`,
        })
      }
    }

    if (newTransaction.hasOwnProperty('userId')) {
      const checkUser = await User.findOne({
        where: { id: newTransaction.userId },
      })
      if (!checkUser) {
        return res.send({
          message: `Maaf, tidak ada user dengan id ${newTransaction.userId}`,
        })
      }
    }

    await Transaction.update(newTransaction, {
      where: {
        id,
      },
    })

    let transaction = await Transaction.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: House,
          as: 'house',
          include: [
            {
              model: City,
              as: 'city',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
            {
              model: User,
              as: 'user',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],
              },
            },
          ],
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'cityId', 'ownerId'],
          },
        },
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'houseId', 'userId'],
      },
    })

    // change amenities type, so it fits in frontend
    transaction = JSON.parse(JSON.stringify(transaction))
    transaction = {
      ...transaction,
      house: {
        ...transaction.house,
        amenities: transaction.house.amenities.split(','),
      },
    }

    res.send({
      status: 'successs',
      message: 'resource has successfully updated',
      data: transaction,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'failed',
      message: 'internal server error',
    })
  }
}

exports.addAttachment = async (req, res) => {
  const id = req.params.id
  const attachment = req.files.attachment[0].filename

  let newTransaction = req.body
  newTransaction = {
    ...newTransaction,
    status: 'Waiting Approve',
    attachment,
    updated_at: new Date(),
  }

  try {
    await Transaction.update(newTransaction, {
      where: {
        id,
      },
    })

    let transaction = await Transaction.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: House,
          as: 'house',
          include: [
            {
              model: City,
              as: 'city',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
            {
              model: User,
              as: 'user',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],
              },
            },
          ],
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'cityId', 'ownerId'],
          },
        },
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'houseId', 'userId'],
      },
    })

    // change amenities type, so it fits in frontend
    transaction = JSON.parse(JSON.stringify(transaction))
    transaction = {
      ...transaction,
      house: {
        ...transaction.house,
        amenities: transaction.house.amenities.split(','),
      },
    }

    res.send({
      status: 'successs',
      message: 'attachment has successfully added',
      data: transaction,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'failed',
      message: 'internal server error',
    })
  }
}

exports.getTransaction = async (req, res) => {
  const id = req.params.id

  try {
    let transaction = await Transaction.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: House,
          as: 'house',
          include: [
            {
              model: City,
              as: 'city',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
            {
              model: User,
              as: 'user',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],
              },
            },
          ],
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'cityId', 'ownerId'],
          },
        },
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'houseId', 'userId'],
      },
    })

    // change amenities type, so it fits in frontend
    transaction = JSON.parse(JSON.stringify(transaction))
    transaction = {
      ...transaction,
      house: {
        ...transaction.house,
        amenities: transaction.house.amenities.split(','),
      },
    }

    res.send({
      status: 'successs',
      message: 'resource has successfully get',
      data: transaction,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'failed',
      message: 'internal server error',
    })
  }
}

exports.getTransactions = async (req, res) => {
  const { idUser, statusUser } = req
  const { type } = req.query

  let whereQuery = {}

  if (statusUser === 'tenant' && type === 'booking') {
    whereQuery = {
      userId: idUser,
      status: {
        [or]: ['Waiting Payment', 'Waiting Approve'],
      },
    }
  }

  if (statusUser === 'owner' && type === 'incoming') {
    whereQuery = {
      ownerId: idUser,
      status: {
        [or]: ['Waiting Approve', 'Approve', 'Cancel'],
      },
    }
  }

  if (statusUser === 'tenant' && type === 'history') {
    whereQuery = {
      userId: idUser,
      status: {
        [or]: ['Approve', 'Cancel'],
      },
    }
  }

  if (statusUser === 'owner' && type === 'history') {
    whereQuery = {
      ownerId: idUser,
      status: {
        [or]: ['Approve', 'Cancel'],
      },
    }
  }

  try {
    let transactions = await Transaction.findAll({
      where: {
        ...whereQuery,
      },
      include: [
        {
          model: House,
          as: 'house',
          include: [
            {
              model: City,
              as: 'city',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
            {
              model: User,
              as: 'user',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],
              },
            },
          ],
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'cityId', 'ownerId'],
          },
        },
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'houseId', 'userId'],
      },
    })

    // change amenities type, so it fits in frontend
    transactions = JSON.parse(JSON.stringify(transactions))
    transactions = transactions.map((transaction) => {
      transaction = {
        ...transaction,
        house: {
          ...transaction.house,
          amenities: transaction.house.amenities.split(','),
        },
        attachment: transaction.attachment
          ? path + transaction.attachment
          : null,
      }

      return transaction
    })

    res.send({
      status: 'successs',
      message: 'resources has successfully get',
      data: transactions,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'failed',
      message: 'internal server error',
    })
  }
}

exports.deleteTransaction = async (req, res) => {
  const id = req.params.id

  try {
    await Transaction.destroy({
      where: {
        id,
      },
    })

    res.send({
      status: 'successs',
      message: 'transaction has successfully deleted',
      data: {
        id,
      },
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'failed',
      message: 'internal server error',
    })
  }
}
