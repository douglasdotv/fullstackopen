import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './slices/notificationSlice'
import blogsReducer from './slices/blogsSlice'
import authReducer from './slices/authSlice'
import usersReducer from './slices/usersSlice'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    authenticatedUser: authReducer,
    users: usersReducer,
  },
})

export default store
