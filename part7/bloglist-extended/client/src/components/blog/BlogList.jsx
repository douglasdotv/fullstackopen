import { useSelector } from 'react-redux'
import Blog from './Blog'
import SectionTitle from '../common/SectionTitle'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <SectionTitle text="Blogs" level={2} />
      {sortedBlogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
