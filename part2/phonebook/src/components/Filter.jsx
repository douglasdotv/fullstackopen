import FormInput from './FormInput'

const Filter = ({ searchQuery, onInputChange }) => {
  return (
    <div>
      <FormInput
        name="searchQuery"
        label="Filter by name"
        value={searchQuery}
        onChange={onInputChange}
      />
    </div>
  )
}

export default Filter
