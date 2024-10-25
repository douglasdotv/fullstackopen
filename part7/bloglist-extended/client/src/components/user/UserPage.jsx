import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../../store/slices/usersSlice'
import { initializeUser, login, logout } from '../../store/slices/authSlice'
import { showNotification } from '../../store/slices/notificationSlice'
import UserList from './UserList'
import LoginForm from '../auth/LoginForm'
import Button from '../common/Button'

const UserPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.authenticatedUser)

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(initializeUsers())
    }
  }, [user, dispatch])

  const handleLogin = async credentials => {
    try {
      dispatch(login(credentials))
      dispatch(showNotification('Logged in successfully!', 'success'))
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        'Server is unreachable. Please try again later.'
      dispatch(showNotification(errorMessage, 'error'))
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch(showNotification('Logged out successfully!', 'success'))
  }

  return (
    <div>
      {user ? (
        <>
          <p>{user.name} logged in!</p>
          <Button onClick={handleLogout}>Logout</Button>
          <UserList />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  )
}

export default UserPage
