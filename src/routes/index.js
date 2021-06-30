const { Router } = require('express')
const { signIn, signUp } = require('../controllers/users')
const {
  getHouses,
  getHouse,
  addHouse,
  editHouse,
  deleteHouse,
} = require('../controllers/houses')

const route = Router()

route.post('/signin', signIn)
route.post('/signup', signUp)

route.get('/houses', getHouses)
route.get('/house/:id', getHouse)
route.post('/house', addHouse)
route.patch('/house/:id', editHouse)
route.delete('/house/:id', deleteHouse)

module.exports = route
