import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    setNotification(_state, action) {
      const notification = action.payload
      return notification
    },
    clearNotification(_state, _action) {
      return ''
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
