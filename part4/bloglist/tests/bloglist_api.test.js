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

  test('Should have a property named "id" for each blog post in the response', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    for (const blog of blogs) {
      assert.ok(blog.id)
    }
  })

  test('Should successfully create a valid blog post and return it with status code 201', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://test.com',
      likes: 0,
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.title, 'Test Blog')
    assert.strictEqual(response.body.author, 'Test Author')
    assert.strictEqual(response.body.url, 'https://test.com')
    assert.strictEqual(response.body.likes, 0)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  })

  test('Should default "likes" to 0 if property is missing when creating a blog post', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://test.com',
    }

    const response = await api.post('/api/blogs').send(newBlog)
    assert.strictEqual(response.body.likes, 0)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  })

  test('Should return 400 when creating a blog post without "title", "author" or "url"', async () => {
    const requiredFields = ['title', 'author', 'url']

    for (const field of requiredFields) {
      const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'https://test.com',
        likes: 0,
      }

      delete newBlog[field]

      await api.post('/api/blogs').send(newBlog).expect(400)
    }

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('Should return 400 when "likes" is not a positive integer', async () => {
    const invalidLikesValues = [-1, 'five', 5.5, null]

    for (const likes of invalidLikesValues) {
      const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'https://test.com',
        likes,
      }

      await api.post('/api/blogs').send(newBlog).expect(400)
    }

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
