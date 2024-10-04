import { useState, useEffect } from 'react'
import BlogList from './BlogList'
import LoginForm from './LoginForm'
import blogService from '../services/blogs'
import loginService from '../services/login'

const BlogPage = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (user) {
      blogService.getAll().then((fetchedBlogs) => {
        setBlogs(fetchedBlogs)
      })
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await loginService.login({ username, password })
      const loggedInUser = {
        name: response.user.name,
        username: response.user.username,
        token: response.token,
      }
      setUser(loggedInUser)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('Failed to log in:', error)
    }
  }

  return (
    <div>
      {user ? (
        <BlogList blogs={blogs} user={user} />
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
