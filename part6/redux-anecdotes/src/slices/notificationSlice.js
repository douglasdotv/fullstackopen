import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Welcome to the Anecdotes app!'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {},
})

export default notificationSlice.reducer
