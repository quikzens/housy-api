require('dotenv').config()

const express = require('express')
const router = require('./src/routes')
const cors = require('cors')

const PORT = 3000

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/v1', router)
app.use('/uploads', express.static('uploads'))

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
