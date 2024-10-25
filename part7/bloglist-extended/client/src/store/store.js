import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './slices/notificationSlice'
import blogsReducer from './slices/blogsSlice'
import userReducer from './slices/userSlice'
import usersReducer from './slices/usersSlice'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer,
  },
})

export default store
