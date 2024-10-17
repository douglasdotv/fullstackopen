import { configureStore } from '@reduxjs/toolkit'
import anecdotesReducer from './slices/anecdotesSlice'
import filterReducer from './slices/filterSlice'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer,
  },
})

export default store
