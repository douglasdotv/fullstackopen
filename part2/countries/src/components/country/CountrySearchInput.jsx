import InputField from '../common/InputField'

const CountrySearchInput = ({ value, onChange }) => (
  <InputField
    label="Find countries"
    type="text"
    value={value}
    onChange={onChange}
  />
)

export default CountrySearchInput
