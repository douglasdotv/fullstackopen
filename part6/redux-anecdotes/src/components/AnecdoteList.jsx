import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdotesReducer'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)

  const handleVote = (id) => {
    dispatch(voteForAnecdote(id))
  }

  const filteredAndSortedAnecdotes = anecdotes
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
