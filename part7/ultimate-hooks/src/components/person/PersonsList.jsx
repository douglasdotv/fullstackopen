import Person from './Person'

const PersonsList = ({ persons }) => (
  <div>
    {persons.map((person) => (
      <Person key={person.id} person={person} />
    ))}
  </div>
)

export default PersonsList
