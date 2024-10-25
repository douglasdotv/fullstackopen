import { useDispatch } from 'react-redux'
import { showNotification } from '../store/slices/notificationSlice'
import {
  login as loginAction,
  logout as logoutAction,
} from '../store/slices/authSlice'

const useAuth = () => {
  const dispatch = useDispatch()

  const handleLogin = async credentials => {
    try {
      dispatch(loginAction(credentials))
      dispatch(showNotification('Logged in successfully!', 'success'))
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        'Server is unreachable. Please try again later.'
      dispatch(showNotification(errorMessage, 'error'))
    }
  }

  const handleLogout = () => {
    dispatch(logoutAction())
    dispatch(showNotification('Logged out successfully!', 'success'))
  }

  return { handleLogin, handleLogout }
}

export default useAuth
