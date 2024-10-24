import Form from '../common/Form'
import Button from '../common/Button'
import Input from '../common/Input'

const NoteForm = ({ contentInput, onSubmit }) => (
  <Form onSubmit={onSubmit}>
    <Input label="Content: " {...contentInput} />
    <Button type="submit">Create</Button>
  </Form>
)

export default NoteForm
