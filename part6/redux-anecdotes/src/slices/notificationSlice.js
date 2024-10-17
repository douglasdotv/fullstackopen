import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationSet(_state, action) {
      const notification = action.payload
      return notification
    },
    notificationCleared(_state, _action) {
      return initialState
    },
  },
})

export const { notificationSet, notificationCleared } =
  notificationSlice.actions
export default notificationSlice.reducer
