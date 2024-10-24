import Note from './Note'

const NotesList = ({ notes }) => (
  <div>
    {notes.map((note) => (
      <Note key={note.id} note={note} />
    ))}
  </div>
)

export default NotesList
