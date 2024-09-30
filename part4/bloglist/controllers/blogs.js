const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
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

  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Invalid or missing token' })
  }

  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(404).json({ error: 'User not found' })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id,
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ error: 'Invalid blog post ID' })
  }

  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(404).json({ error: 'Blog post not found' })
  }

  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const updatedBlogData = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(id, updatedBlogData, {
    new: true,
    runValidators: true,
  })

  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).json({ error: 'Blog post not found' })
  }
})

module.exports = blogsRouter
