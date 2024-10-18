import { createSlice } from '@reduxjs/toolkit'

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
    createAnecdote(state, action) {
      const anecdote = action.payload
      state.push(anecdote)
    },
    setAnecdotes(_state, action) {
      const anecdotes = action.payload
      return anecdotes
    },
  },
})

export const { castVote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
