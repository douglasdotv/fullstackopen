import { useState } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import Menu from './components/layout/Menu'
import Footer from './components/layout/Footer'
import AnecdoteList from './components/features/AnecdoteList'
import AnecdoteDetail from './components/features/AnecdoteDetail'
import CreateAnecdote from './components/features/CreateAnecdote'
import About from './components/features/About'
import Heading from './components/common/Heading'
import Notification from './components/common/Notification'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often.',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil.',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])

  const [notification, setNotification] = useState({ message: '', type: '' })

  const handleCreateAnecdote = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null

  return (
    <div>
      <Heading level={1}>Software Anecdotes</Heading>
      <Menu />
      <Notification message={notification.message} type={notification.type} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/anecdotes/:id"
          element={<AnecdoteDetail anecdote={anecdote} />}
        />
        <Route
          path="/create"
          element={
            <CreateAnecdote
              onCreate={handleCreateAnecdote}
              setNotification={setNotification}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
