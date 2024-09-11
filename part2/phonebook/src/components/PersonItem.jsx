const PersonItem = ({ person }) => {
  const { name, number } = person
  return (
    <li>
      {name} {number}
    </li>
  )
}

export default PersonItem
