import PropTypes from 'prop-types'
import Blog from './Blog'
import SectionTitle from '../common/SectionTitle'

const BlogList = ({ blogs, user, onLike, onRemove }) => (
  <div>
    <SectionTitle text="Blogs" level={2} />
    {blogs.map(blog => (
      <Blog
        key={blog.id}
        blog={blog}
        currentUser={user}
        onLike={onLike}
        onRemove={onRemove}
      />
    ))}
  </div>
)

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default BlogList
