import Blog from './Blog'
import SectionTitle from '../common/SectionTitle'

const BlogList = ({ blogs, user, onLike, onRemove }) => (
  <div>
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

export default BlogList
