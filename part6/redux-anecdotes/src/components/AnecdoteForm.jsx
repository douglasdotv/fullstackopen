import { useDispatch } from 'react-redux'
import { anecdoteCreated } from '../slices/anecdotesSlice'
import Form from './Form'
import Input from './Input'
import Button from './Button'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreateAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdoteContent.value
    event.target.anecdoteContent.value = ''
    dispatch(anecdoteCreated(content))
  }

  return (
    <Form onSubmit={handleCreateAnecdote}>
      <Input name="anecdoteContent" placeholder="Type your anecdote here..." />
      <Button type="submit">Create</Button>
    </Form>
  )
}

export default AnecdoteForm
