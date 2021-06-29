const { Router } = require('express')
const { signIn, signUp } = require('../controllers/users')

const route = Router()

route.post('/signin', signIn)
route.post('/signup', signUp)

module.exports = route
