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
    const errors = validatePerson(newName, newNumber)
    if (errors) {
      notify(
        `Error: ${errors.nameError || ''} ${errors.numberError || ''}`,
        'error'
      )
      return
    }

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.trim().toLowerCase()
    )

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    if (existingPerson) {
      const isConfirmed = window.confirm(
        `${existingPerson.name} is already added to the phonebook. Do you want to replace the old number with the new one?`
      )
      if (isConfirmed) {
        personService
          .update(existingPerson.id, newPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : updatedPerson
              )
            )
            setNewName('')
            setNewNumber('')
            notify(
              `${newPerson.name}'s number was successfully updated.`,
              'success'
            )
          })
          .catch((error) => {
            notify(`Failed to update ${existingPerson.name}. ${error}`, 'error')
          })
      }
    } else {
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          notify(`${newPerson.name} was successfully added.`, 'success')
        })
        .catch((error) => {
          notify(`Failed to add ${newPerson.name}. ${error}`, 'error')
        })
    }
  }

  const removePerson = (id) => {
    const personToRemove = persons.find((person) => person.id === id)
    const isConfirmed = window.confirm(
      `Do you really want to remove ${personToRemove.name}?`
    )
    if (isConfirmed) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
          notify(`${personToRemove.name} was successfully removed.`, 'success')
        })
        .catch((error) => {
          notify(`Failed to remove ${personToRemove.name}. ${error}`, 'error')
        })
    }
  }

  const notify = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
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
