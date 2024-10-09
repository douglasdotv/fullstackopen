import { useState, useEffect, useRef } from 'react'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import LoginForm from './LoginForm'
import Notification from './Notification'
import Toggleable from './Toggleable'
import blogService from '../services/blogs'
import loginService from '../services/login'

const BlogPage = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: '', type: '' })

  const blogFormRef = useRef()

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
      console.error('Failed to log in', error)
      showNotification('Failed to log in', 'error')
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
      showNotification(
        `${createdBlog.title} by ${createdBlog.author} created!`,
        'success'
      )
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      console.error('Failed to create blog post', error)
      showNotification('Failed to create blog post', 'error')
    }
  }

  const handleUpdateBlog = async (id, updatedBlog) => {
    try {
      await blogService.update(id, {
        ...updatedBlog,
        user: updatedBlog.user.id,
      })
      setBlogs(blogs.map((blog) => (blog.id === id ? updatedBlog : blog)))
      showNotification(`Liked ${updatedBlog.title}!`, 'success')
    } catch (error) {
      console.error('Failed to update blog post', error)
      showNotification('Failed to update blog post', 'error')
    }
  }

  const handleRemoveBlog = async (id) => {
    try {
      const blogToRemove = blogs.find((blog) => blog.id === id)
      await blogService.remove(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      showNotification(`Removed ${blogToRemove.title}!`, 'success')
    } catch (error) {
      console.error('Failed to remove blog post', error)
      showNotification('Failed to remove blog post', 'error')
    }
  }

  const showNotification = (message, type, duration = 3000) => {
    setNotification({ message, type })
    setTimeout(() => {
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
          <BlogList
            blogs={sortedBlogs}
            user={user}
            onLogout={handleLogout}
            onLike={handleUpdateBlog}
            onRemove={handleRemoveBlog}
          />
          <Toggleable buttonLabel="New blog post" ref={blogFormRef}>
            <BlogForm onSubmit={handleCreateBlog} />
          </Toggleable>
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  )
}

export default BlogPage
