import Button from './Button'

const Anecdote = ({ anecdote, onVote }) => (
  <div>
    <div>{anecdote.content}</div>
    <div>
      ({anecdote.votes} votes)
      <Button onClick={onVote}>Vote</Button>
    </div>
  </div>
)

export default Anecdote
