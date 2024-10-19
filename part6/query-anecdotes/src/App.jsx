import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Heading from './components/Heading'

const App = () => {
  return (
    <div>
      <Heading>Anecdotes</Heading>
      <AnecdoteList />
      <Heading level={3}>Create a new anecdote</Heading>
      <AnecdoteForm />
    </div>
  )
}

export default App
