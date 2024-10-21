import { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'

const Menu = () => {
  const linkStyle = {
    paddingRight: 5,
  }

  return (
    <div>
      <Link to="/" style={linkStyle}>
        Anecdotes
      </Link>
      <Link to="/create" style={linkStyle}>
        Create
      </Link>
      <Link to="/about" style={linkStyle}>
        About
      </Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>{anecdote.content}</li>
      ))}
    </ul>
  </div>
)

const CreateAnecdote = ({ onCreate }) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    onCreate({
      content: content,
      author: author,
      info: info,
      votes: 0,
    })

    navigate('/')
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content:{' '}
          <input
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          Author:{' '}
          <input
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          Info (URL):{' '}
          <input
            name="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <button>Create</button>
      </form>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About</h2>
    <p>According to Wikipedia:</p>
    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is a story with a point.
    </em>
    <p>
      Software engineering is full of excellent anecdotes. With this app you can
      find the best and add more.
    </p>
  </div>
)

const Footer = () => {
  const style = {
    background: '#F0F0F0',
    color: '#333333',
    fontSize: 16,
    fontFamily: "'Press Start 2P', 'Orbitron', monospace",
    borderStyle: 'solid',
    borderColor: '#00FFFF',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    boxShadow: '0 0 5px #00FFFF',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)',
  }

  return (
    <div style={style}>
      Anecdote app for{' '}
      <a href="https://fullstackopen.com/en/part7">Full Stack Open part7</a>
    </div>
  )
}
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

  const handleCreateAnecdote = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  return (
    <div>
      <h1>Software Anecdotes</h1>
      <Menu />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/create"
          element={<CreateAnecdote onCreate={handleCreateAnecdote} />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
