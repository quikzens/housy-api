const { Transaction, House, City, User } = require('../../models')

exports.addTransaction = async (req, res) => {
  let transactionData = req.body
  // change amenities type, so it fits in database
  transactionData = {
    ...transactionData,
    created_at: new Date(),
    updated_at: new Date(),
  }

  try {
    const checkHouse = await House.findOne({
      where: { id: transactionData.house_id },
    })
    if (!checkHouse) {
      return res.send({
        message: `Tidak ada house dengan id ${transactionData.house_id}`,
      })
    }

    const checkUser = await User.findOne({
      where: { id: transactionData.user_id },
    })
    if (!checkUser) {
      return res.send({
        message: `Tidak ada user dengan id ${transactionData.user_id}`,
      })
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
                exclude: ['created_at', 'updated_at'],
              },
            },
          ],
          attributes: {
            exclude: ['created_at', 'updated_at', 'city_id'],
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
        exclude: ['created_at', 'updated_at', 'house_id', 'user_id'],
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
    updated_at: new Date(),
  }

  try {
    const checkHouse = await House.findOne({
      where: { id: newTransaction.house_id },
    })
    if (!checkHouse) {
      return res.send({
        message: `Tidak ada house dengan id ${newTransaction.house_id}`,
      })
    }

    const checkUser = await User.findOne({
      where: { id: newTransaction.user_id },
    })
    if (!checkUser) {
      return res.send({
        message: `Tidak ada user dengan id ${newTransaction.user_id}`,
      })
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
                exclude: ['created_at', 'updated_at'],
              },
            },
          ],
          attributes: {
            exclude: ['created_at', 'updated_at', 'city_id'],
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
        exclude: ['created_at', 'updated_at', 'house_id', 'user_id'],
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
                exclude: ['created_at', 'updated_at'],
              },
            },
          ],
          attributes: {
            exclude: ['created_at', 'updated_at', 'city_id'],
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
        exclude: ['created_at', 'updated_at', 'house_id', 'user_id'],
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
  try {
    let transactions = await Transaction.findAll({
      include: [
        {
          model: House,
          as: 'house',
          include: [
            {
              model: City,
              as: 'city',
              attributes: {
                exclude: ['created_at', 'updated_at'],
              },
            },
          ],
          attributes: {
            exclude: ['created_at', 'updated_at', 'city_id'],
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
        exclude: ['created_at', 'updated_at', 'house_id', 'user_id'],
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
