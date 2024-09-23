const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (_request, response, next) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs)
    })
    .catch(next)
})

blogsRouter.post('/', (request, response, next) => {
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

module.exports = blogsRouter
