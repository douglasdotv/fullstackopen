import PropTypes from 'prop-types'
import Blog from './Blog'
import Button from './Button'
import SectionTitle from './SectionTitle'

const BlogList = ({ blogs, user, onLogout, onLike, onRemove }) => (
  <div>
    <p>{user.name} logged in!</p>
    <Button onClick={onLogout}>Logout</Button>
    <SectionTitle text="Blogs" level={2} />
    {blogs.map((blog) => (
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
  onLogout: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default BlogList
