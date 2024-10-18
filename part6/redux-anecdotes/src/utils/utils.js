import {
  notificationSet,
  notificationCleared,
} from '../slices/notificationSlice'

let timeoutId = null

export const handleNotification = (dispatch, message) => {
  dispatch(notificationSet(message))

  if (timeoutId) {
    clearTimeout(timeoutId)
  }

  timeoutId = setTimeout(() => {
    dispatch(notificationCleared())
    timeoutId = null
  }, 5000)
}
