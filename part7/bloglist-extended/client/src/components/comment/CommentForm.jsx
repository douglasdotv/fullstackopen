import PropTypes from 'prop-types'
import { useState } from 'react'
import Button from '../common/Button'
import Form from '../common/Form'
import FormInput from '../common/FormInput'

const CommentForm = ({ onSubmit }) => {
  const [commentText, setCommentText] = useState('')

  const handleInputChange = e => {
    setCommentText(e.target.value)
  }

  const handleSubmit = () => {
    onSubmit(commentText)
    setCommentText('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormInput
        type="text"
        label="Comment"
        name="comment"
        value={commentText}
        onChange={handleInputChange}
      />
      <Button type="submit">Add Comment</Button>
    </Form>
  )
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default CommentForm
