import Blog from './Blog'
import SectionTitle from './SectionTitle'

const BlogList = ({ blogs, onLike }) => (
  <div>
    <SectionTitle text="Blogs" level={2} />
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} onLike={onLike} />
    ))}
  </div>
)

export default BlogList
