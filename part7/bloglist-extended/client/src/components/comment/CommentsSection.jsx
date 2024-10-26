import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  initializeComments,
  addComment,
} from '../../store/slices/commentsSlice'
import { showNotification } from '../../store/slices/notificationSlice'
import SectionTitle from '../common/SectionTitle'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

const CommentsSection = ({ blogId }) => {
  const dispatch = useDispatch()
  const comments = useSelector(state => state.comments[blogId]) || []

  useEffect(() => {
    dispatch(initializeComments(blogId))
  }, [dispatch, blogId])

  const handleCommentSubmit = commentText => {
    if (commentText.trim()) {
      dispatch(addComment(blogId, commentText))
      dispatch(showNotification('Comment added!', 'success'))
    }
  }

  return (
    <div>
      <SectionTitle text="Comments" level={3} />
      <CommentForm onSubmit={handleCommentSubmit} />
      <CommentList comments={comments} />
    </div>
  )
}

export default CommentsSection
