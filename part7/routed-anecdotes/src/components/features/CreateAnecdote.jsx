import { useNavigate } from 'react-router-dom'
import useField from '../../hooks/useField'
import Button from '../common/Button'
import Form from '../common/Form'
import InputField from '../common/InputField'
import Heading from '../common/Heading'

const CreateAnecdote = ({ onCreate, setNotification }) => {
  const contentField = useField('text')
  const authorField = useField('text')
  const infoField = useField('text')

  const navigate = useNavigate()

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: '', type: '' })
    }, 5000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    onCreate({
      content: contentField.value,
      author: authorField.value,
      info: infoField.value,
      votes: 0,
    })

    showNotification(
      `Anecdote "${contentField.value}" successfully created`,
      'success'
    )

    navigate('/')
  }

  return (
    <div>
      <Heading level={2}>Create a new anecdote</Heading>
      <Form onSubmit={handleSubmit}>
        <InputField name="content" label="Content" {...contentField} />
        <InputField name="author" label="Author" {...authorField} />
        <InputField name="info" label="Info (URL)" {...infoField} />
        <Button type="submit">Create</Button>
      </Form>
    </div>
  )
}

export default CreateAnecdote
