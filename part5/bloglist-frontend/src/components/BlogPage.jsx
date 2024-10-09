import { useState, useEffect, useRef } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import LoginForm from './LoginForm'
import Notification from './Notification'
import Toggleable from './Toggleable'
import Button from './Button'

const BlogPage = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: '', type: '' })

  const blogFormRef = useRef(null)
  const notificationTimeoutRef = useRef(null)

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

  const handleLogin = async (credentials) => {
    try {
      const response = await loginService.login(credentials)
      const user = {
        name: response.user.name,
        username: response.user.username,
        token: response.token,
      }
      window.localStorage.setItem('authenticatedUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      showNotification('Logged in successfully!', 'success')
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

  const handleCreateBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      showNotification(`"${createdBlog.title}" created!`, 'success')
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        'Server is unreachable. Please try again later.'
      showNotification(errorMessage, 'error')
    }
  }

  const showNotification = (message, type, duration = 3000) => {
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current)
    }

    setNotification({ message, type })

    notificationTimeoutRef.current = setTimeout(() => {
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
          <Toggleable buttonLabel="New blog post" ref={blogFormRef}>
            <BlogForm onSubmit={handleCreateBlog} />
          </Toggleable>
          <BlogList blogs={blogs} />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  )
}

export default BlogPage
