import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    anecdotesSet(_state, action) {
      const anecdotes = action.payload
      return anecdotes
    },
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
  },
})

export const { anecdotesSet, anecdoteVoteCast, anecdoteCreated } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch, _getState) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(anecdotesSet(anecdotes))
  }
}

export default anecdoteSlice.reducer
