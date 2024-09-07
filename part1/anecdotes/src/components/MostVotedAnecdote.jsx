import Anecdote from './Anecdote'
import Title from './Title'

const MostVotedAnecdote = ({ anecdote }) => {
  const isVoteCountEmpty = anecdote.votes === 0

  if (isVoteCountEmpty) {
    return (
      <>
        <Title text="Anecdote with most votes" />
        <p>No votes yet</p>
      </>
    )
  }

  return (
    <>
      <Title text="Anecdote with most votes" />
      <Anecdote anecdote={anecdote} />
    </>
  )
}

export default MostVotedAnecdote
