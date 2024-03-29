const jwt = require('jsonwebtoken')
const secretKey = 'absolutelyfreakingsecret'

exports.auth = (req, res, next) => {
  try {
    let header = req.header('Authorization')

    if (!header) {
      return res.send({
        status: 'failed',
        message: 'Access denied',
      })
    }

    let token = header.replace('Bearer ', '')

    const verified = jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return res.send({
          status: 'failed',
          message: 'User not verified',
        })
      } else {
        return decoded
      }
    })

    req.idUser = verified.id
    req.statusUser = verified.status

    next()
  } catch (error) {
    console.log(error)
    res.send({
      status: 'failed',
      message: 'Server Error',
    })
  }
}
