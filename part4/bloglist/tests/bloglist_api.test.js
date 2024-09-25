const { test, describe, after, beforeEach } = require('node:test')
const supertest = require('supertest')
const assert = require('assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

describe('Tests for /api/blogs', () => {
  test('Should return all blog posts as json with status code 200', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Should return the correct amount of blog posts in the database', async () => {
    const response = await api.get('/api/blogs')
    const blogsAtStart = await helper.blogsInDb()
    assert.strictEqual(response.body.length, blogsAtStart.length)
  })

  test('Should contain a specific blog post', async () => {
    const response = await api.get('/api/blogs')
    const blogsAtStart = await helper.blogsInDb()
    const blogToFind = blogsAtStart[0]
    const blog = response.body.find((blog) => blog.id === blogToFind.id)
    assert.notStrictEqual(blog, undefined)
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
