import { createContext, useReducer, useMemo } from 'react'
import { notificationReducer } from './notificationReducer'

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const initialState = ''
  const [notification, dispatch] = useReducer(notificationReducer, initialState)

  const value = useMemo(
    () => ({ notification, dispatch }),
    [notification, dispatch]
  )

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
