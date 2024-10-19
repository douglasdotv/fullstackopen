import { createContext, useReducer, useMemo, useRef } from 'react'
import { notificationReducer } from './notificationReducer'

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const initialState = {
    message: '',
    type: '',
  }

  const [notificationState, dispatch] = useReducer(
    notificationReducer,
    initialState
  )

  const timeoutRef = useRef(null)

  const notificationContextValue = useMemo(
    () => ({ notificationState, dispatch, timeoutRef }),
    [notificationState, dispatch]
  )

  return (
    <NotificationContext.Provider value={notificationContextValue}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
