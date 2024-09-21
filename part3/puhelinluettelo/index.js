require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.json())

morgan.token('body', (req, _) =>
  req.method === 'POST' ? JSON.stringify(req.body) : ''
)
const customFormat =
  ':method :url :status :res[content-length] - :response-time ms :body'
app.use(morgan(customFormat))

app.use(express.static('dist'))

app.get('/info', (_req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      const date = new Date()
      const info = `
        <p>Phonebook has info for ${count} people</p>
        <p>${date}</p>
      `
      res.send(info)
    })
    .catch((error) => next(error))
})

app.get('/api/persons', (_req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(id, person, { new: true, runValidators: true })
    .then((updatedPerson) => res.json(updatedPerson))
    .catch((error) => next(error))
})

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, _req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Malformed id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  res.status(500).json({ error: 'Internal server error' })
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
