import Blog from './Blog'
import Button from './Button'
import SectionTitle from './SectionTitle'

const BlogList = ({ blogs, user, onLogout }) => (
  <div>
    <p>{user.name} logged in!</p>
    <Button onClick={onLogout}>Logout</Button>
    <SectionTitle text="Blogs" level={2} />
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
)

export default BlogList
