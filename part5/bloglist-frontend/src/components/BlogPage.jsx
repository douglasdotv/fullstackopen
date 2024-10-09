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
      showNotification('Logged in successfully', 'success')
    } catch (error) {
      showNotification(`${error.response.data.error}`, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('authenticatedUser')
    setUser(null)
    blogService.setToken(null)
    showNotification('Logged out successfully', 'success')
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
      showNotification(`${error.response.data.error}`, 'error')
    }
  }

  const handleUpdateBlog = async (id, updatedBlog) => {
    try {
      const updatedBlogData = await blogService.update(id, {
        ...updatedBlog,
        user: updatedBlog.user.id,
      })
      setBlogs(blogs.map((blog) => (blog.id === id ? updatedBlogData : blog)))
      showNotification(`Liked ${updatedBlogData.title}!`, 'success')
    } catch (error) {
      showNotification(`${error.response.data.error}`, 'error')
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
          <BlogList
            blogs={blogs}
            user={user}
            onLogout={handleLogout}
            onLike={handleUpdateBlog}
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
