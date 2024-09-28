const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Learning Node.js',
    author: 'John Doe',
    url: 'http://example.com/learning-node',
    likes: 15,
  },
  {
    title: 'Exploring async/await in JavaScript',
    author: 'Jane Smith',
    url: 'http://example.com/async-await',
    likes: 8,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Temp Blog',
    author: 'Temp Author',
    url: 'http://example.com/temp-blog',
    likes: 0,
  })
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

const initialUsers = [
  {
    username: 'john_doe',
    name: 'John Doe',
    password: 'password123',
  },
  {
    username: 'jane_smith',
    name: 'Jane Smith',
    password: 'password456',
  },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId,
  initialUsers,
  usersInDb,
}
