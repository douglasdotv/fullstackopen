import Button from './Button'

const PersonItem = ({ person, onRemove }) => {
  const { name, number, id } = person
  return (
    <li>
      {name} {number} <Button onClick={() => onRemove(id)}>Remove</Button>
    </li>
  )
}

export default PersonItem
