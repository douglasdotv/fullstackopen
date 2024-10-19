import { useContext } from 'react'
import NotificationContext from './NotificationContext'

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    )
  }
  return context
}

export const useNotificationState = () => {
  const { notificationState } = useNotification()
  return notificationState
}

export const useNotificationDispatch = () => {
  const { dispatch, timeoutRef } = useNotification()

  const showNotification = (message, type, timeout = 5000) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    dispatch({
      type: 'notification/notificationSet',
      payload: { message, type },
    })

    timeoutRef.current = setTimeout(() => {
      dispatch({
        type: 'notification/notificationCleared',
      })
    }, timeout)
  }

  return showNotification
}
