const { test, describe, after, beforeEach } = require('node:test')
const supertest = require('supertest')
const assert = require('assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

let token = null
let user = null

describe('Tests for /api/blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const userAndToken = await helper.createUserAndGetAuthDetails()
    token = userAndToken.token
    user = userAndToken.user

    const blogObjects = helper.initialBlogs.map(
      (blog) => new Blog({ ...blog, user: user._id })
    )
    const promiseArray = blogObjects.map((blog) => blog.save())
    await Promise.all(promiseArray)

    user.blogs = blogObjects.map((blog) => blog._id)
    await user.save()
  })

  describe('Fetching blog posts', () => {
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
  })

  describe('Creating blog posts', () => {
    test('Should successfully create a valid blog post and return it with status code 201', async () => {
      const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'https://test.com',
        likes: 0,
      }

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
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

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
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

        await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${token}`)
          .send(newBlog)
          .expect(400)
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

        await api
          .post('/api/blogs')
          .set('Authorization', `Bearer ${token}`)
          .send(newBlog)
          .expect(400)
      }

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('Should return 401 when attempting to create a blog post without an authentication token', async () => {
      const newBlog = {
        title: 'Unauthorized Blog',
        author: 'No Token Author',
        url: 'https://thereisnotoken.com',
        likes: 0,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('Deleting blog posts', () => {
    test('Should successfully delete an existing blog post and return 204', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map((b) => b.title)
      assert.ok(!titles.includes(blogToDelete.title))
    })

    test('Should return 404 when deleting a non-existing blog post', async () => {
      const validNonExistingId = await helper.nonExistingId()

      await api.delete(`/api/blogs/${validNonExistingId}`).expect(404)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('Should return 400 when deleting a blog post with invalid ID', async () => {
      const invalidId = '$123'

      await api.delete(`/api/blogs/${invalidId}`).expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('Updating blog posts', () => {
    test('Should successfully update an existing blog post and return it with status code 200', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlogData = {
        title: 'Updated Title',
        author: 'Updated Author',
        url: 'https://updatedurl.com',
        likes: blogToUpdate.likes + 10,
      }

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlogData)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.title, updatedBlogData.title)
      assert.strictEqual(response.body.author, updatedBlogData.author)
      assert.strictEqual(response.body.url, updatedBlogData.url)
      assert.strictEqual(response.body.likes, updatedBlogData.likes)

      const blogsAtEnd = await helper.blogsInDb()
      const updatedBlog = blogsAtEnd.find((b) => b.id === blogToUpdate.id)

      assert.strictEqual(updatedBlog.title, updatedBlogData.title)
      assert.strictEqual(updatedBlog.author, updatedBlogData.author)
      assert.strictEqual(updatedBlog.url, updatedBlogData.url)
      assert.strictEqual(updatedBlog.likes, updatedBlogData.likes)
    })

    test('Should return 404 when updating a non-existing blog post', async () => {
      const validNonExistingId = await helper.nonExistingId()

      const updatedBlogData = {
        title: 'Updated Title',
        author: 'Updated Author',
        url: 'https://updatedurl.com',
        likes: 10,
      }

      await api
        .put(`/api/blogs/${validNonExistingId}`)
        .send(updatedBlogData)
        .expect(404)
    })

    test('Should return 400 when updating a blog post with invalid ID', async () => {
      const invalidId = '$123'

      const updatedBlogData = {
        title: 'Updated Title',
        author: 'Updated Author',
        url: 'https://updatedurl.com',
        likes: 10,
      }

      await api.put(`/api/blogs/${invalidId}`).send(updatedBlogData).expect(400)
    })

    test('Should return 400 when updating a blog post with invalid data', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const invalidData = {
        title: '',
        author: 'Updated Author',
        url: 'https://updatedurl.com',
        likes: -5,
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(invalidData)
        .expect(400)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
