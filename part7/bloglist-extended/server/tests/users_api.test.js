const { test, describe, beforeEach, after } = require('node:test')
const supertest = require('supertest')
const assert = require('assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('Tests for /api/users', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const userObjects = helper.initialUsers.map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
  })

  test('Should successfully create a new valid user with status code 201', async () => {
    const newUser = {
      username: 'valid_user',
      name: 'Valid User',
      password: 'validpassword',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, helper.initialUsers.length + 1)
    const usernames = usersAtEnd.map(u => u.username)
    assert.ok(usernames.includes(newUser.username))
  })

  test('Should fail to create a user with short username and return status code 400', async () => {
    const newUser = {
      username: 'us',
      name: 'Test User',
      password: 'validpassword',
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    assert.ok(
      result.body.error.includes('Username must be at least 3 characters')
    )
  })

  test('Should fail to create a user with short password and return status code 400', async () => {
    const newUser = {
      username: 'valid_user',
      name: 'Test User',
      password: 'pw',
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    assert.ok(
      result.body.error.includes('Password must be at least 3 characters long')
    )
  })

  test('Should fail to create a user without a username and return status code 400', async () => {
    const newUser = {
      name: 'Test User',
      password: 'validpassword',
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    assert.ok(result.body.error.includes('Username is required'))
  })

  test('Should fail to create a user without a password and return status code 400', async () => {
    const newUser = {
      username: 'valid_user',
      name: 'Test User',
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    assert.ok(result.body.error.includes('Password is required'))
  })

  test('Should fail to create a user with an existing username and return status code 409', async () => {
    const newUser = {
      username: 'john_doe',
      name: 'Duplicate User',
      password: 'validpassword',
    }

    const result = await api.post('/api/users').send(newUser).expect(409)

    assert.ok(result.body.error.includes('Username already exists'))
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
