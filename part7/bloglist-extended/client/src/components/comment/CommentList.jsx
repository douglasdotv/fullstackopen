import PropTypes from 'prop-types'
import { Box, Typography } from '@mui/material'

const CommentList = ({ comments }) => {
  return (
    <Box sx={{ mt: 2 }}>
      {comments.map(comment => (
        <Typography key={comment.id} variant="body1" sx={{ mb: 1 }}>
          "{comment.text}"
        </Typography>
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
