import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useAuth from '../../hooks/useAuth'
import Button from '../common/Button'

const NavigationMenu = () => {
  const user = useSelector(state => state.authenticatedUser)
  const { handleLogout } = useAuth()

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/blogs">Blogs</Link>
      <Link to="/users">Users</Link>
      {user && (
        <span>
          {user.name} logged in! <Button onClick={handleLogout}>Logout</Button>
        </span>
      )}
    </nav>
  )
}

export default NavigationMenu
