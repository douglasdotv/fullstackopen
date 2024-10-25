import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Blog from './Blog'
import SectionTitle from '../common/SectionTitle'

const BlogList = ({ onLike, onRemove }) => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <SectionTitle text="Blogs" level={2} />
      {sortedBlogs.map(blog => (
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
}

BlogList.propTypes = {
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default BlogList
