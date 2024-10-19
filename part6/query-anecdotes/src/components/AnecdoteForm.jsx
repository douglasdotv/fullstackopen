import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests/anecdotes'
import { useNotificationDispatch } from '../contexts/notification/useNotificationHooks'
import Form from './Form'
import Button from './Button'
import Input from './Input'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']) || []
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `Anecdote '${newAnecdote.content}' successfully created`,
      })
      setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
    },
    onError: (error) => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `${error.response.data.error}`,
      })
      setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
    },
  })

  const handleCreateAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <Form onSubmit={handleCreateAnecdote}>
        <Input name="anecdote" placeholder="Type your anecdote here" />
        <Button type="submit">Create</Button>
      </Form>
    </div>
  )
}

export default AnecdoteForm
