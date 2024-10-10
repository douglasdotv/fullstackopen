import { useState, useEffect, useRef } from 'react'
import blogService from '../../services/blogs'
import loginService from '../../services/login'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import LoginForm from '../auth/LoginForm'
import Notification from '../utils/Notification'
import Toggleable from '../utils/Toggleable'
import Button from '../common/Button'

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
        id: response.user.id,
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

  const handleUpdateBlog = async (id, updatedBlog) => {
    try {
      const updatedBlogResponse = await blogService.update(id, {
        ...updatedBlog,
        user: updatedBlog.user.id,
      })

      setBlogs(
        blogs.map((blog) =>
          blog.id === id ? { ...updatedBlogResponse, user: blog.user } : blog
        )
      )

      showNotification(`Liked "${updatedBlogResponse.title}"!`, 'success')
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        'Server is unreachable. Please try again later.'
      showNotification(errorMessage, 'error')
    }
  }

  const handleRemoveBlog = async (id) => {
    try {
      const blogToRemove = blogs.find((blog) => blog.id === id)

      if (!blogToRemove) {
        showNotification(`Blog with id "${id}" not found.`, 'error')
        return
      }

      await blogService.remove(id)

      setBlogs(blogs.filter((blog) => blog.id !== id))

      showNotification(`Removed "${blogToRemove.title}"!`, 'success')
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

  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes)

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
          <BlogList
            blogs={sortedBlogs}
            user={user}
            onLike={handleUpdateBlog}
            onRemove={handleRemoveBlog}
          />
          <BlogList blogs={sortedBlogs} onLike={handleUpdateBlog} />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  )
}

export default BlogPage
