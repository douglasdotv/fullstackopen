import FormInput from './FormInput'

const Filter = ({ searchQuery, onSearchQueryChange }) => {
  return (
    <div>
      <FormInput
        label="Filter by name"
        value={searchQuery}
        onChange={onSearchQueryChange}
      />
    </div>
  )
}

export default Filter
