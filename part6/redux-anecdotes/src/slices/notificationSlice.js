import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
let timeoutId = null

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

export const showNotification = (notification, timeInSeconds) => {
  return (dispatch, _getState) => {
    dispatch(notificationSet(notification))

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch(notificationCleared())
    }, timeInSeconds * 1000)
  }
}

export default notificationSlice.reducer
