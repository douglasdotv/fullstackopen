import useField from './hooks/useField'
import useResource from './hooks/useResource'
import NoteForm from './components/note/NoteForm'
import NotesList from './components/note/NotesList'
import PersonForm from './components/person/PersonForm'
import PersonsList from './components/person/PersonsList'

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
      <NotesList notes={notes} />
      <NoteForm content={contentInput} onSubmit={handleNoteSubmit} />

      <h2>Persons</h2>
      <PersonsList persons={persons} />
      <PersonForm
        name={nameInput}
        number={number}
        onSubmit={handlePersonSubmit}
      />
    </div>
  )
}

export default App
