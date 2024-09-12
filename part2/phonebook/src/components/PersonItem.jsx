const PersonItem = ({ person, onRemove }) => {
  const { name, number, id } = person
  return (
    <li>
      {name} {number} <button onClick={() => onRemove(id)}>Remove</button>
    </li>
  )
}

export default PersonItem
