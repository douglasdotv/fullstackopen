import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await axios.get(baseUrl)
        const allResources = response.data
        setResources(allResources)
      } catch (error) {
        console.error('Error while fetching resources:', error)
      }
    }
    fetchAll()
  }, [baseUrl])

  const create = async (newResource) => {
    try {
      const response = await axios.post(baseUrl, newResource)
      const createdResource = response.data
      setResources(resources.concat(createdResource))
    } catch (error) {
      console.error('Error while creating resource:', error)
    }
  }

  const service = {
    create,
  }

  return [resources, service]
}

const App = () => {
  const contentInput = useField('text')
  const nameInput = useField('text')
  const numberInput = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: contentInput.value })
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: nameInput.value, number: numberInput.value })
  }

  return (
    <div>
      <h2>Notes</h2>
      <form onSubmit={handleNoteSubmit}>
        Content: <input {...contentInput} />
        <button type="submit">Create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>Persons</h2>
      <form onSubmit={handlePersonSubmit}>
        Name: <input {...nameInput} /> <br />
        Number: <input {...numberInput} />
        <button type="submit">Create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  )
}

export default App
