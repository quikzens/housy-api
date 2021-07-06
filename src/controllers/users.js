const { User, House, City } = require('../../models')
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secretKey = process.env.SECRET_KEY

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
                exclude: ['created_at', 'updated_at'],
              },
            },
          ],
          attributes: {
            exclude: ['created_at', 'updated_at', 'city_id', 'owner_id'],
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
    const { email, password } = req.body

    const schema = joi.object({
      fullname: joi.string().min(3).required(),
      username: joi.string().min(3).required(),
      email: joi.string().email().required(),
      password: joi.string().min(8).required(),
      list_as: joi.string().required(),
      gender: joi.string().required(),
      address: joi.string().required(),
    })

    const { error } = schema.validate(userData)
    if (error) {
      return res.send({
        status: 'failed',
        message: error.details[0].message,
      })
    }

    const checkEmail = await User.findOne({
      where: {
        email,
      },
    })
    if (checkEmail) {
      return res.send({
        status: 'failed',
        message: 'Email Already Registered',
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
        status: user.list_as,
      },
      secretKey
    )

    res.send({
      status: 'success',
      data: {
        username: user.username,
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
        status: checkUsername.list_as,
      },
      secretKey
    )

    res.send({
      status: 'success',
      data: {
        username: checkUsername.username,
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
