const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const app = express()

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI)
    logger.info('Connected to MongoDB')
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error.message)
  }
}
mongoose.set('strictQuery', false)
connectToDatabase()

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)

app.use(
  '/api/blogs',
  middleware.tokenExtractor,
  middleware.userExtractor,
  blogsRouter
)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
