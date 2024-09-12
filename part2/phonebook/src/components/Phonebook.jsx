import { useEffect, useState } from 'react'
import personService from '../services/persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Title from './Title'

const Phonebook = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const filteredPersons = persons.filter((person) => {
    return person.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    switch (name) {
      case 'name':
        setNewName(value)
        break
      case 'number':
        setNewNumber(value)
        break
      case 'searchQuery':
        setSearchQuery(value)
        break
      default:
        console.warn(`No handler for input name: ${name}`)
    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (!validatePerson(newName, newNumber)) {
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const removePerson = (id) => {
    const personToRemove = persons.find((person) => person.id === id)
    const isConfirmed = window.confirm(
      `Do you really want to remove ${personToRemove.name}?`
    )
    if (isConfirmed) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id))
      })
    }
  }

  const validateName = (name) => {
    const trimmedName = name.trim()

    if (trimmedName === '') {
      alert('Error: name cannot be empty')
      return false
    }

    const isDuplicateName = persons.some(
      (person) => person.name.toLowerCase() === name.trim().toLowerCase()
    )

    if (isDuplicateName) {
      alert(`Error: ${trimmedName} is already added to the phonebook`)
      return false
    }

    return true
  }

  const validateNumber = (number) => {
    const trimmedNumber = number.trim()
    const phoneNumberPattern = /^[0-9-\s]+$/

    if (!phoneNumberPattern.test(trimmedNumber)) {
      alert(`Error: ${trimmedNumber} is not a valid phone number`)
      return false
    }

    return true
  }

  const validatePerson = (name, number) => {
    return validateName(name) && validateNumber(number)
  }

  return (
    <div>
      <Title text="Phonebook" />
      <Filter searchQuery={searchQuery} onInputChange={handleInputChange} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onInputChange={handleInputChange}
        onSubmit={addPerson}
      />
      <Persons persons={filteredPersons} onRemove={removePerson} />
    </div>
  )
}

export default Phonebook
