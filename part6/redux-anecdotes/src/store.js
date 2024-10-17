import { configureStore } from '@reduxjs/toolkit'
import anecdotesReducer from './reducers/anecdotesReducer'
import filterReducer from './slices/filterSlice'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer,
  },
})

export default store
