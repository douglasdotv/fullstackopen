import { Link } from 'react-router-dom'
import Heading from '../common/Heading'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <Heading level={2}>Anecdotes</Heading>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
)

export default AnecdoteList
