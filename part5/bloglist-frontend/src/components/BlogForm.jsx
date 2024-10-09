import Form from './Form'
import { useState } from 'react'
import Button from './Button'
import FormInput from './FormInput'
import SectionTitle from './SectionTitle'

const BlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <SectionTitle text="Create a new blog post" level={2} />
      <Form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          label="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <FormInput
          type="text"
          label="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <FormInput
          type="text"
          label="URL"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button type="submit">Create</Button>
      </Form>
    </div>
  )
}

export default BlogForm
