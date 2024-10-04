import Blog from './Blog'
import SectionTitle from './SectionTitle'

const BlogList = ({ blogs }) => (
  <div>
    <SectionTitle text="Blogs" level={2} />
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
)

export default BlogList
