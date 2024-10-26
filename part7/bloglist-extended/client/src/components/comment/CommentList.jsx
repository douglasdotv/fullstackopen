import PropTypes from 'prop-types'
import Comment from './Comment'

const CommentList = ({ comments }) => {
  return (
    <ul>
      {comments.map(comment => (
        <Comment key={comment.id} text={comment.text} />
      ))}
    </ul>
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
