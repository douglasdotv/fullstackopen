import FormInput from './FormInput'
import Title from './Title'

const PersonForm = ({
  newName,
  newNumber,
  onNameChange,
  onNumberChange,
  onSubmit,
}) => {
  return (
    <>
      <Title text="Add New Person" />
      <form onSubmit={onSubmit}>
        <FormInput label="Name" value={newName} onChange={onNameChange} />
        <FormInput label="Number" value={newNumber} onChange={onNumberChange} />
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm
