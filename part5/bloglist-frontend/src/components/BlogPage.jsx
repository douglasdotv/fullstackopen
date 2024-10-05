import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import LoginForm from './LoginForm'
import Notification from './Notification'
import Button from './Button'

const BlogPage = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: '', type: '' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
        try {
          const blogs = await blogService.getAll()
          setBlogs(blogs)
        } catch (error) {
          showNotification(
            'Server is unreachable. Please try again later.',
            'error'
          )
        }
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
      blogService.setToken(user.token)
      showNotification('Logged in successfully!', 'success')
      setUsername('')
      setPassword('')
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        'Server is unreachable. Please try again later.'
      showNotification(errorMessage, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('authenticatedUser')
    setUser(null)
    blogService.setToken(null)
    showNotification('Logged out successfully!', 'success')
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(newBlog))
      showNotification(`"${newBlog.title}" created!`, 'success')
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        'Server is unreachable. Please try again later.'
      showNotification(errorMessage, 'error')
    }
  }

  const showNotification = (message, type, duration = 3000) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: '', type: '' })
    }, duration)
  }

  return (
    <div>
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}
      {user ? (
        <>
          <p>{user.name} logged in!</p>
          <Button onClick={handleLogout}>Logout</Button>
          <BlogForm
            onSubmit={handleCreateBlog}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
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
