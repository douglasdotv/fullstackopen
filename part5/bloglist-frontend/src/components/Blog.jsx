import { useState } from 'react'
import Button from './Button'

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleDetails = () => setExpanded(!expanded)

  return (
    <div>
      {blog.title} {blog.author}
      <Button onClick={toggleDetails}>{expanded ? 'Hide' : 'View'}</Button>
      {expanded && (
        <div>
          <p>{blog.url}</p>
          <p>
            Likes: {blog.likes}
            <Button>Like</Button>
          </p>
          <p>{blog.user.name}</p>
        </div>
      )}
    </div>
  )
}

export default Blog
