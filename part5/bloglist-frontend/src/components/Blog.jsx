import { useState } from 'react'
import Button from './Button'

const Blog = ({ blog }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false)

  const toggleDetails = () => setIsDetailsVisible(!isDetailsVisible)

  return (
    <div className="blog-post-container">
      <div className="blog-post-title">{blog.title}</div>
      <div className="blog-post-author">by {blog.author}</div>
      <Button onClick={toggleDetails}>
        {isDetailsVisible ? 'Hide' : 'View'}
      </Button>
      {isDetailsVisible && (
        <div className="blog-post-details">
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
