import { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Title from './Title'

const Phonebook = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const filteredPersons = persons.filter((person) => {
    return person.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const isDuplicateName = (name) => {
    return persons.some(
      (person) => person.name.toLowerCase() === name.trim().toLowerCase()
    )
  }

  const isValidPhoneNumber = (number) => {
    const pattern = /^[0-9-\s]+$/
    return pattern.test(number.trim())
  }

  const validatePerson = (name, number) => {
    if (isDuplicateName(name)) {
      alert(`Error: ${name} is already added to the phonebook`)
      return false
    }

    if (!isValidPhoneNumber(number)) {
      alert(`Error: ${number} is not a valid phone number`)
      return false
    }

    return true
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (!validatePerson(newName, newNumber)) {
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    setPersons(persons.concat(newPerson))

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <Title text="Phonebook" />
      <Filter
        searchQuery={searchQuery}
        onSearchQueryChange={handleSearchQueryChange}
      />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={addPerson}
      />
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default Phonebook
