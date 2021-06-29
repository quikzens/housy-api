const { Router } = require('express')
const { signIn } = require('../controllers/users')

const route = Router()

route.post('/signin', signIn)

module.exports = route
