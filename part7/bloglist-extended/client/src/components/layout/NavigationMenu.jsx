import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppBar, Toolbar, ButtonGroup, Button, Box } from '@mui/material'
import useAuth from '../../hooks/useAuth'

const NavigationMenu = () => {
  const user = useSelector(state => state.authenticatedUser)
  const { handleLogout } = useAuth()

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <ButtonGroup color="inherit" variant="text">
            <Button component={Link} to="/">
              Home
            </Button>
            <Button component={Link} to="/blogs">
              Blogs
            </Button>
            <Button component={Link} to="/users">
              Users
            </Button>
          </ButtonGroup>
        </Box>
        {user && (
          <div>
            {user.name} logged in!{' '}
            <Button
              color="inherit"
              sx={{ bgcolor: 'white', color: 'primary.main' }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavigationMenu
