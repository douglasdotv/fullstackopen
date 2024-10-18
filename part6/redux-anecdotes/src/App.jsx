import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './slices/anecdoteSlice'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Heading from './components/Heading'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <Notification />
      <Heading>Anecdotes</Heading>
      <Filter />
      <AnecdoteList />
      <Heading level={3}>Create a new anecdote</Heading>
      <AnecdoteForm />
    </div>
  )
}

export default App
