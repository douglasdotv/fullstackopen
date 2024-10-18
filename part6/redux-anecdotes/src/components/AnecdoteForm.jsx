import { useDispatch } from 'react-redux'
import { createAnecdote } from '../slices/anecdotesSlice'
import { handleNotification } from '../utils/utils'
import Form from './Form'
import Input from './Input'
import Button from './Button'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreateAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdoteContent.value
    event.target.anecdoteContent.value = ''
    dispatch(createAnecdote(content))
    handleNotification(dispatch, `Anecdote "${content}" successfully created`)
  }

  return (
    <Form onSubmit={handleCreateAnecdote}>
      <Input name="anecdoteContent" placeholder="Type your anecdote here..." />
      <Button type="submit">Create</Button>
    </Form>
  )
}

export default AnecdoteForm
