import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import BlogList from './BlogList'
import LoginForm from './LoginForm'
import Button from './Button'

const BlogPage = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const userJSON = window.localStorage.getItem('authenticatedUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const fetchBlogs = async () => {
      if (user) {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      }
    }
    fetchBlogs()
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await loginService.login({ username, password })
      const user = {
        name: response.user.name,
        username: response.user.username,
        token: response.token,
      }
      window.localStorage.setItem('authenticatedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('Failed to log in.', error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('authenticatedUser')
    setUser(null)
  }

  return (
    <div>
      {user ? (
        <>
          <p>{user.name} logged in!</p>
          <Button onClick={handleLogout}>Logout</Button>
          <BlogList blogs={blogs} />
        </>
      ) : (
        <LoginForm
          onLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
    </div>
  )
}

export default BlogPage
