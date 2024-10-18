import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: initialState,
  reducers: {
    castVote(state, action) {
      const anecdoteId = action.payload
      return state.map((anecdote) => {
        return anecdote.id === anecdoteId
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      })
    },
    setAnecdotes(_state, action) {
      const anecdotes = action.payload
      return anecdotes
    },
    appendAnecdote(state, action) {
      const anecdote = action.payload
      state.push(anecdote)
    },
  },
})

export const { castVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch, _getState) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch, _getState) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer
