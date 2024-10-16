import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
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
