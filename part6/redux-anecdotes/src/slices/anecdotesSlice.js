import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    anecdoteVoteCast(state, action) {
      const anecdoteId = action.payload
      const anecdote = state.find((anecdote) => anecdote.id === anecdoteId)
      if (!anecdote) {
        return state
      }
      anecdote.votes += 1
    },
    anecdoteCreated(state, action) {
      const anecdote = action.payload
      state.push(anecdote)
    },
    anecdotesSet(_state, action) {
      const anecdotes = action.payload
      return anecdotes
    },
  },
})

export const { anecdoteVoteCast, anecdoteCreated, anecdotesSet } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer
