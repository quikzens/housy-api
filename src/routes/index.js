const { Router } = require('express')

// Controller
const {
  getHouses,
  getHouse,
  addHouse,
  editHouse,
  deleteHouse,
} = require('../controllers/houses')
const {
  addTransaction,
  editTransaction,
  deleteTransaction,
  getTransaction,
  getTransactions,
  addAttachment,
} = require('../controllers/transactions')
const {
  getUser,
  getUsers,
  signUp,
  signIn,
  deleteUser,
  changePassword,
  addAvatar,
  addProfileImage,
} = require('../controllers/users')
const { addImages } = require('../controllers/images')

// Middleware
const { auth } = require('../middlewares/auth')
const { uploadFile } = require('../middlewares/uploadFile')

const route = Router()

route.post('/signin', signIn)
route.post('/signup', signUp)
route.get('/user', auth, getUser)
route.patch('/user/changepassword', auth, changePassword)
route.patch('/user/profile', auth, uploadFile('profile'), addProfileImage)
route.patch('/user/avatar', auth, uploadFile('avatar'), addAvatar)
route.get('/users', auth, getUsers)
route.delete('/user/:id', auth, deleteUser)

route.get('/houses', getHouses)
route.get('/house/:id', getHouse)
route.post('/house', auth, uploadFile('imageFile'), addHouse)
route.patch('/house/:id', auth, editHouse)
route.delete('/house/:id', auth, deleteHouse)

route.post('/transaction', auth, addTransaction)
route.patch('/order/:id', auth, editTransaction)
route.patch(
  '/order/addattachment/:id',
  auth,
  uploadFile('attachment'),
  addAttachment
)
route.delete('/order/:id', auth, deleteTransaction)
route.get('/order/:id', auth, getTransaction)
route.get('/orders', auth, getTransactions)

route.post('/images/:id', auth, uploadFile('details'), addImages)

module.exports = route
