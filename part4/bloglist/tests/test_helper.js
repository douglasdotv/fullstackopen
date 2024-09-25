const Blog = require('../models/blog')

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

module.exports = { initialBlogs, blogsInDb }
