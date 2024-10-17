import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './slices/anecdoteSlice'
import filterReducer from './slices/filterSlice'
import notificationReducer from './slices/notificationSlice'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
})

export default store
