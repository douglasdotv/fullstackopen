const Anecdote = ({ anecdote }) => {
  const { text, votes } = anecdote
  const hasVotes = votes > 0
  const isSingleVote = votes === 1

  return (
    <>
      <p>{text}</p>
      <p>
        (Has {hasVotes ? votes : 'no'} vote
        {isSingleVote ? '' : 's'})
      </p>
    </>
  )
}

export default Anecdote
