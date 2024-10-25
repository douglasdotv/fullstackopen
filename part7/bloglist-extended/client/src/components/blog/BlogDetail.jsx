import { useEffect } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser } from '../../store/slices/authSlice'
import {
  initializeBlogs,
  likeBlog,
  removeBlog,
} from '../../store/slices/blogsSlice'
import { showNotification } from '../../store/slices/notificationSlice'
import Button from '../common/Button'
import SectionTitle from '../common/SectionTitle'

const BlogDetail = () => {
  const match = useMatch('/blogs/:id')
  const blogId = match?.params?.id

  const dispatch = useDispatch()
  const blog = useSelector(state =>
    state.blogs.find(blog => blog.id === blogId)
  )
  const currentUser = useSelector(state => state.authenticatedUser)

  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) {
      dispatch(initializeUser())
    }
    if (!blog) {
      dispatch(initializeBlogs())
    }
  }, [dispatch, blog, currentUser])

  if (!blog) {
    return <p>Loading...</p>
  }

  const handleLike = async () => {
    try {
      dispatch(likeBlog(blog.id))
      dispatch(showNotification(`Liked "${blog.title}"!`, 'success'))
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        'Server is unreachable. Please try again later.'
      dispatch(showNotification(errorMessage, 'error'))
    }
  }

  const handleRemove = async () => {
    try {
      dispatch(removeBlog(blog.id))
      dispatch(showNotification(`Removed "${blog.title}"!`, 'success'))
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        'Server is unreachable. Please try again later.'
      dispatch(showNotification(errorMessage, 'error'))
    }
    navigate('/blogs')
  }

  const blogUserId = blog.user.id || blog.user
  const isBlogByCurrentUser = currentUser.id === blogUserId

  return (
    <div>
      <SectionTitle text={blog.title} />
      <p>Author: {blog.author}</p>
      <p>
        Total likes: {blog.likes} <Button onClick={handleLike}>Like</Button>
      </p>
      <p>
        Link:{' '}
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </p>
      <p>Added by {blog.user.name}</p>
      {isBlogByCurrentUser && <Button onClick={handleRemove}>Remove</Button>}
    </div>
  )
}

export default BlogDetail
