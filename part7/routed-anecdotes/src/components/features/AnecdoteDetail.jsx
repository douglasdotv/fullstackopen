import Heading from '../common/Heading'

const AnecdoteDetail = ({ anecdote }) => {
  if (!anecdote) {
    return <p>Anecdote not found</p>
  }

  return (
    <div>
      <Heading level={2}>“{anecdote.content}”</Heading>
      <Heading level={3}>by {anecdote.author}</Heading>
      <p>This anecdote has received {anecdote.votes} votes.</p>
      <p>
        For more information, click <a href={anecdote.info}>here</a>.
      </p>
      <hr />
    </div>
  )
}

export default AnecdoteDetail
