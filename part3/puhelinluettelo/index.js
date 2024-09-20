const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(express.json())

app.use(cors())

morgan.token('body', (req, _) =>
  req.method === 'POST' ? JSON.stringify(req.body) : ''
)
const customFormat =
  ':method :url :status :res[content-length] - :response-time ms :body'
app.use(morgan(customFormat))

const validatePerson = (body) => {
  if (!body.name || !body.number) {
    return { error: 'Name or number missing' }
  }
  if (persons.find((person) => person.name === body.name)) {
    return { error: 'Name must be unique' }
  }
  return null
}

const generateId = () => {
  return Math.floor(Math.random() * 1000000000).toString()
}

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/info', (_req, res) => {
  const date = new Date()
  const totalPhonebookEntries = persons.length
  const info = `<p>Phonebook has info for ${totalPhonebookEntries} people</p><p>${date}</p>`
  res.send(info)
})

app.get('/api/persons', (_req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find((p) => p.id === id)
  person ? res.json(person) : res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter((p) => p.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  const validationError = validatePerson(body)

  if (validationError) {
    return res.status(400).json(validationError)
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(newPerson)

  res.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
