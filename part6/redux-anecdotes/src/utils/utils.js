import { setNotification, clearNotification } from '../slices/notificationSlice'

let notificationTimeoutId = null

export const handleNotification = (dispatch, message) => {
  dispatch(setNotification(message))

  if (notificationTimeoutId) {
    clearTimeout(notificationTimeoutId)
  }

  notificationTimeoutId = setTimeout(() => {
    dispatch(clearNotification())
    notificationTimeoutId = null
  }, 5000)
}

export const generateId = () => (100000 * Math.random()).toFixed(0)
