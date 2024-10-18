import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../slices/anecdotesSlice'
import { showNotification } from '../slices/notificationSlice'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)

  const handleVote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote))
    dispatch(showNotification(`You voted for "${anecdote.content}"`, 10))
  }

  const filteredAndSortedAnecdotes = [...anecdotes]
    .filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {filteredAndSortedAnecdotes.map((anecdote) => (
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
