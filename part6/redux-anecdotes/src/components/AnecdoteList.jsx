import { useSelector, useDispatch } from 'react-redux'
import { anecdoteVoteCast } from '../slices/anecdotesSlice'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)

  const handleVote = (id) => {
    dispatch(anecdoteVoteCast(id))
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
          onVote={() => handleVote(anecdote.id)}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
