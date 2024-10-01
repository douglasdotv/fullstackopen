const mongoose = require('mongoose')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

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
  const user = request.user

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

  if (!user) {
    return response.status(401).json({ error: 'Invalid or missing token' })
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
  const user = request.user

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ error: 'Invalid blog post ID' })
  }

  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(404).json({ error: 'Blog post not found' })
  }

  if (!user || blog.user.toString() !== user._id.toString()) {
    return response
      .status(403)
      .json({ error: 'Forbidden: you can only delete your own blog posts' })
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
