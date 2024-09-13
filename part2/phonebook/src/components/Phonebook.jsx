import { useEffect, useState } from 'react'
import personService from '../services/persons'
import { validatePerson } from '../utils/validation'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Title from './Title'
import Notification from './Notification'

const Phonebook = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll().then(setPersons)
  }, [])

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

  const addOrUpdatePerson = (existingPerson, newPerson) => {
    if (existingPerson) {
      personService
        .update(existingPerson.id, newPerson)
        .then((updatedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== existingPerson.id ? p : updatedPerson))
          )
          handleSubmitSuccess(
            `${newPerson.name}'s number was successfully updated.`
          )
        })
        .catch((error) => {
          notify(`Failed to update ${existingPerson.name}. ${error}`, 'error')
        })
    } else {
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons([...persons, returnedPerson])
          handleSubmitSuccess(`${newPerson.name} was successfully added.`)
        })
        .catch((error) => {
          notify(`Failed to add ${newPerson.name}. ${error}`, 'error')
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const errors = validatePerson(newName, newNumber)
    if (errors) {
      notify(
        `Error: ${errors.nameError || ''} ${errors.numberError || ''}`,
        'error'
      )
      return
    }
    const newPerson = { name: newName, number: newNumber }
    const existingPerson = persons.find(
      (p) => p.name.toLowerCase() === newName.trim().toLowerCase()
    )
    addOrUpdatePerson(existingPerson, newPerson)
  }

  const removePerson = (id) => {
    const personToRemove = persons.find((p) => p.id === id)
    if (
      window.confirm(`Do you really want to remove ${personToRemove.name}?`)
    ) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id))
          notify(`${personToRemove.name} was successfully removed.`, 'success')
        })
        .catch((error) => {
          notify(`Failed to remove ${personToRemove.name}. ${error}`, 'error')
        })
    }
  }

  const notify = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleSubmitSuccess = (message) => {
    setNewName('')
    setNewNumber('')
    notify(message, 'success')
  }

  return (
    <div>
      <Notification notification={notification} />
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
