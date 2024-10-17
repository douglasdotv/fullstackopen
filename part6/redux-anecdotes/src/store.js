import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './slices/anecdoteSlice'
import filterReducer from './slices/filterSlice'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
  },
})

export default store
