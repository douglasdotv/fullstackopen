import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <div className="blog-post-container">
      <div className="blog-post-title">
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </div>
      <div className="blog-post-author">by {blog.author}</div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}

export default Blog
