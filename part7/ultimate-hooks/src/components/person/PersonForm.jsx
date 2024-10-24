import Form from '../common/Form'
import Button from '../common/Button'
import Input from '../common/Input'

const PersonForm = ({ nameInput, numberInput, onSubmit }) => (
  <Form onSubmit={onSubmit}>
    <Input label="Name: " {...nameInput} />
    <Input label="Number: " {...numberInput} />
    <Button type="submit">Create</Button>
  </Form>
)

export default PersonForm
