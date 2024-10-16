import { generateId } from '../utils/utils'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const initialState = anecdotesAtStart.map((anecdote) => ({
  content: anecdote,
  id: generateId(),
  votes: 0,
}))

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'anecdotes/voteCast': {
      const anecdoteId = action.payload
      return state.map((anecdote) => {
        return anecdote.id === anecdoteId
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      })
    }
    case 'anecdotes/anecdoteCreated': {
      const anecdote = action.payload
      return [...state, anecdote]
    }
    default:
      return state
  }
}

export const voteForAnecdote = (id) => {
  return {
    type: 'anecdotes/voteCast',
    payload: id,
  }
}

export const createAnecdote = (anecdoteContent) => {
  return {
    type: 'anecdotes/anecdoteCreated',
    payload: {
      content: anecdoteContent,
      votes: 0,
      id: generateId(),
    },
  }
}

export default anecdoteReducer
