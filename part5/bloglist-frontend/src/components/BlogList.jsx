import Blog from './Blog'
import SectionTitle from './SectionTitle'

const BlogList = ({ blogs, user }) => (
  <div>
    <p>{user.name} logged in!</p>
    <SectionTitle text="Blogs" level={2} />
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
)

export default BlogList
