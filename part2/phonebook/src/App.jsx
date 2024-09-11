import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

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
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  )
}

export default App
