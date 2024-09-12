import PersonItem from './PersonItem'
import Title from './Title'

const Persons = ({ persons, onRemove }) => {
  return (
    <>
      <Title text="Numbers" />
      <ul>
        {persons.map((person) => (
          <PersonItem key={person.id} person={person} onRemove={onRemove} />
        ))}
      </ul>
    </>
  )
}

export default Persons
