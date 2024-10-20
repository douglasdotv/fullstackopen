import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from '../requests/anecdotes'
import { useNotificationDispatch } from '../contexts/notification/useNotificationHooks'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: ({ id, updatedFields }) => updateAnecdote(id, updatedFields),
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']) || []
      const updatedAnecdotes = anecdotes.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      )
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `You voted for '${updatedAnecdote.content}'`,
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

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      id: anecdote.id,
      updatedFields: { votes: anecdote.votes + 1 },
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return (
      <div>
        Anecdote service is not available due to problems in server:{' '}
        {error.message}
      </div>
    )
  }

  return (
    <div>
      {data.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          onVote={() => handleVote(anecdote)}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
