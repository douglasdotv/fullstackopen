import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from '../../store/slices/notificationSlice'
import { initializeBlogs, createBlog } from '../../store/slices/blogsSlice'
import { initializeUser } from '../../store/slices/authSlice'
import useAuth from '../../hooks/useAuth'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import LoginForm from '../auth/LoginForm'
import Toggleable from '../utils/Toggleable'

const BlogPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.authenticatedUser)

  const { handleLogin } = useAuth()

  const blogFormRef = useRef(null)

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs())
    }
  }, [user, dispatch])

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

  return (
    <div>
      {user ? (
        <>
          <Toggleable buttonLabel="New blog post" ref={blogFormRef}>
            <BlogForm onSubmit={handleCreateBlog} />
          </Toggleable>
          <BlogList />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  )
}

export default BlogPage
