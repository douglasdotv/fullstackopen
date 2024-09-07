import Anecdote from './Anecdote'
import Button from './Button'
import Title from './Title'

const AnecdoteOfTheDay = ({ anecdote, onVote, onNextAnecdote }) => {
  return (
    <>
      <Title text="Anecdote of the day" />
      <Anecdote anecdote={anecdote} />
      <Button text="Vote" onClick={onVote} />
      <Button text="Next anecdote" onClick={onNextAnecdote} />
    </>
  )
}

export default AnecdoteOfTheDay
