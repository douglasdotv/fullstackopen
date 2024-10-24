import Form from './Form'
import Input from './Input'
import Button from './Button'

const CountryForm = ({ nameInput, handleFetchCountryData }) => {
  return (
    <Form onSubmit={handleFetchCountryData}>
      <Input placeholder="Enter a country name" {...nameInput} />
      <Button type="submit">Find</Button>
    </Form>
  )
}

export default CountryForm
