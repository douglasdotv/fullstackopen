import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdotesReducer'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(voteForAnecdote(id))
  }

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
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
