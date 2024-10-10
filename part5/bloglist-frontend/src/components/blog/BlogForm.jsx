import { useState } from 'react'
import PropTypes from 'prop-types'
import Form from '../common/Form'
import FormInput from '../common/FormInput'
import Button from '../common/Button'
import SectionTitle from '../common/SectionTitle'

const BlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = () => {
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

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default BlogForm
