import Button from './Button'
import FormInput from './FormInput'
import Title from './Title'

const PersonForm = ({ newName, newNumber, onInputChange, onSubmit }) => {
  return (
    <>
      <Title text="Add New Person" />
      <form onSubmit={onSubmit}>
        <FormInput
          name="name"
          label="Name"
          value={newName}
          onChange={onInputChange}
        />
        <FormInput
          name="number"
          label="Number"
          value={newNumber}
          onChange={onInputChange}
        />
        <div>
          <Button type="submit">Add</Button>
        </div>
      </form>
    </>
  )
}

export default PersonForm
