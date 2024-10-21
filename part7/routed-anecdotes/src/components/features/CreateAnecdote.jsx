import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../common/Button'
import Form from '../common/Form'
import InputField from '../common/InputField'
import Heading from '../common/Heading'

const CreateAnecdote = ({ onCreate, setNotification }) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

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
      content,
      author,
      info,
      votes: 0,
    })

    showNotification(`Anecdote "${content}" successfully created`, 'success')

    navigate('/')
  }

  return (
    <div>
      <Heading level={2}>Create a new anecdote</Heading>
      <Form onSubmit={handleSubmit}>
        <InputField
          name="content"
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <InputField
          name="author"
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <InputField
          name="info"
          label="Info (URL)"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
        />
        <Button type="submit">Create</Button>
      </Form>
    </div>
  )
}

export default CreateAnecdote
