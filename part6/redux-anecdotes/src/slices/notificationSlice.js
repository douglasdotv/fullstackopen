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

export const showNotification = (notification, timeInSeconds) => {
  return (dispatch, _getState) => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeInSeconds * 1000)
  }
}

export default notificationSlice.reducer
