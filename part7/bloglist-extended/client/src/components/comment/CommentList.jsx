import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import Comment from './Comment'

const CommentList = ({ comments }) => {
  return (
    <Box sx={{ mt: 2 }}>
      {comments.map(comment => (
        <Comment key={comment.id} text={comment.text} />
      ))}
    </Box>
  )
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default CommentList
