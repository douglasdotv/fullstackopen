import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', id: 1 }])
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const isDuplicateName = persons.some(
      (person) => person.name.toLowerCase() === newName.trim().toLowerCase()
    )

    if (isDuplicateName) {
      alert(`Error: ${newName} is already added to the phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      id: persons.length + 1,
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.id}>{person.name}</div>
      ))}
    </div>
  )
}

export default App
