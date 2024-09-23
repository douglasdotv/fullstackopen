require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoDbUri = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose
  .connect(mongoDbUri)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error while connecting to MongoDB:', error.message)
  })

const requestLogger = (request, _response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

app.get('/api/blogs', (_request, response, next) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs)
    })
    .catch(next)
})

app.post('/api/blogs', (request, response, next) => {
  const { title, author, url, likes } = request.body

  if (!title || !author || !url) {
    return response
      .status(400)
      .json({ error: 'Title, author and url are required' })
  }

  if (likes !== undefined && (!Number.isInteger(likes) || likes < 0)) {
    return response
      .status(400)
      .json({ error: 'Total likes must be a positive integer' })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
  })

  blog
    .save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch(next)
})

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, _request, response, _next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformed id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  response.status(500).json({ error: 'An unexpected error occurred' })
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
