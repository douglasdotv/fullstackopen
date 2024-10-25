import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../../store/slices/notificationSlice'
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  removeBlog,
} from '../../store/slices/blogsSlice'
import { initializeUser, login, logout } from '../../store/slices/userSlice'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import LoginForm from '../auth/LoginForm'
import Notification from '../utils/Notification'
import Toggleable from '../utils/Toggleable'
import Button from '../common/Button'

const BlogPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const blogFormRef = useRef(null)

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs())
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

  const handleCreateBlog = async newBlog => {
    try {
      dispatch(createBlog(newBlog))
      dispatch(showNotification(`"${newBlog.title}" created!`, 'success'))
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        'Server is unreachable. Please try again later.'
      dispatch(showNotification(errorMessage, 'error'))
    }
  }

  const handleUpdateBlog = async (id, updatedBlog) => {
    try {
      dispatch(likeBlog(id))
      dispatch(showNotification(`Liked "${updatedBlog.title}"!`, 'success'))
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        'Server is unreachable. Please try again later.'
      dispatch(showNotification(errorMessage, 'error'))
    }
  }

  const handleRemoveBlog = async id => {
    try {
      const blogToRemove = blogs.find(blog => blog.id === id)
      if (!blogToRemove) {
        dispatch(showNotification(`Blog with id "${id}" not found.`, 'error'))
        return
      }
      dispatch(removeBlog(id))
      dispatch(showNotification(`Removed "${blogToRemove.title}"!`, 'success'))
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        'Server is unreachable. Please try again later.'
      dispatch(showNotification(errorMessage, 'error'))
    }
  }

  return (
    <div>
      <Notification />
      {user ? (
        <>
          <p>{user.name} logged in!</p>
          <Button onClick={handleLogout}>Logout</Button>
          <Toggleable buttonLabel="New blog post" ref={blogFormRef}>
            <BlogForm onSubmit={handleCreateBlog} />
          </Toggleable>
          <BlogList onLike={handleUpdateBlog} onRemove={handleRemoveBlog} />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  )
}

export default BlogPage
