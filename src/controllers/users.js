const { User, House, City } = require('../../models')
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secretKey = process.env.SECRET_KEY

exports.getUser = async (req, res) => {
  const { idUser } = req

  try {
    const user = await User.findOne({
      where: {
        id: idUser,
      },
      include: [
        {
          model: House,
          as: 'houses',
          include: [
            {
              model: City,
              as: 'city',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          ],
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'cityId', 'ownerId'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    })

    res.send({
      status: 'success',
      message: 'resources has successfully get',
      data: user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'failed',
      message: 'internal server error',
    })
  }
}

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: House,
          as: 'houses',
          include: [
            {
              model: City,
              as: 'city',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          ],
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'cityId', 'ownerId'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    })

    res.send({
      status: 'success',
      message: 'resources has successfully get',
      data: users,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'failed',
      message: 'internal server error',
    })
  }
}

exports.signUp = async (req, res) => {
  try {
    const userData = req.body
    const { username, password } = req.body

    const schema = joi.object({
      fullname: joi.string().min(3).required(),
      username: joi.string().min(3).required(),
      email: joi.string().email().required(),
      password: joi.string().min(8).required(),
      listAs: joi.string().required(),
      gender: joi.string().required(),
      phone: joi.string().required(),
      address: joi.string().required(),
    })

    const { error } = schema.validate(userData)
    if (error) {
      return res.send({
        status: 'failed',
        message: error.details[0].message,
      })
    }

    const checkUsername = await User.findOne({
      where: {
        username,
      },
    })
    if (checkUsername) {
      return res.send({
        status: 'failed',
        message: 'Username already registered',
      })
    }

    const hashStrenght = 10
    const hashedPassword = await bcrypt.hash(password, hashStrenght)

    const user = await User.create({
      ...userData,
      password: hashedPassword,
    })

    const token = jwt.sign(
      {
        id: user.id,
        status: user.listAs,
      },
      secretKey
    )

    res.send({
      status: 'success',
      data: {
        username: user.username,
        listAs: user.listAs,
        token,
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

exports.signIn = async (req, res) => {
  try {
    const userData = req.body
    const { username, password } = req.body

    const schema = joi.object({
      username: joi.string().min(3).required(),
      password: joi.string().min(8).required(),
    })

    const { error } = schema.validate(userData)
    if (error) {
      return res.send({
        status: 'failed',
        message: error.details[0].message,
      })
    }

    const checkUsername = await User.findOne({
      where: {
        username,
      },
    })
    if (!checkUsername) {
      return res.send({
        status: 'failed',
        message: "Username or Password don't match",
      })
    }

    const isValidPassword = await bcrypt.compare(
      password,
      checkUsername.password
    )

    if (!isValidPassword) {
      return res.send({
        status: 'failed',
        message: "Username or Password don't match",
      })
    }

    const token = jwt.sign(
      {
        id: checkUsername.id,
        status: checkUsername.listAs,
      },
      secretKey
    )

    res.send({
      status: 'success',
      data: {
        username: checkUsername.username,
        listAs: checkUsername.listAs,
        token,
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

exports.deleteUser = async (req, res) => {
  const id = req.params.id

  try {
    await User.destroy({
      where: {
        id,
      },
    })

    res.send({
      status: 'successs',
      message: 'resource has successfully deleted',
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

exports.changePassword = async (req, res) => {
  const { idUser } = req
  const { oldPassword, newPassword } = req.body

  try {
    let user = await User.findOne({
      where: {
        id: idUser,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    })

    const isPassed = await bcrypt.compare(oldPassword, user.password)
    if (!isPassed) {
      return res.send({
        status: 'failed',
        message: 'old password is wrong',
      })
    }

    const hashStrenght = 10
    const hashedPassword = await bcrypt.hash(newPassword, hashStrenght)

    await User.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          id: idUser,
        },
      }
    )

    user = await User.findOne({
      where: {
        id: idUser,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    })

    res.send({
      status: 'success',
      message: 'password has been changed',
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: 'failed',
      message: 'internal server error',
    })
  }
}
