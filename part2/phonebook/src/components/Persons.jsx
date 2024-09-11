import PersonItem from './PersonItem'
import Title from './Title'

const Persons = ({ persons }) => {
  return (
    <>
      <Title text="Numbers" />
      <ul>
        {persons.map((person) => (
          <PersonItem key={person.id} person={person} />
        ))}
      </ul>
    </>
  )
}

export default Persons
