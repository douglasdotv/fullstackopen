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
    anecdoteAppended(state, action) {
      const anecdote = action.payload
      state.push(anecdote)
    },
    anecdoteVoteCast(state, action) {
      const updatedAnecdote = action.payload
      const index = state.findIndex(
        (anecdote) => anecdote.id === updatedAnecdote.id
      )
      if (index !== -1) {
        state[index] = updatedAnecdote
      }
    },
  },
})

export const { anecdotesSet, anecdoteAppended, anecdoteVoteCast } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch, _getState) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(anecdotesSet(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch, _getState) => {
    const newAnecdote = await anecdoteService.create({ content, votes: 0 })
    dispatch(anecdoteAppended(newAnecdote))
  }
}

export const voteForAnecdote = (anecdote) => {
  return async (dispatch, _getState) => {
    const updatedVotesField = {
      votes: anecdote.votes + 1,
    }
    const updatedAnecdote = await anecdoteService.update(
      anecdote.id,
      updatedVotesField
    )
    dispatch(anecdoteVoteCast(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
