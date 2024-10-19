import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const handleVote = (anecdote) => {
    console.log('handleVote')
  }

  const anecdotes = [
    {
      content: 'If it hurts, do it more often',
      id: '47145',
      votes: 0,
    },
  ]

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            Has {anecdote.votes} votes
            <button onClick={() => handleVote(anecdote)}>Vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
