import { useState } from 'react'
import Button from './Button'

const Blog = ({ blog, currentUser, onLike, onRemove }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false)

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    onLike(blog.id, updatedBlog)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      onRemove(blog.id)
    }
  }

  const toggleDetails = () => setIsDetailsVisible(!isDetailsVisible)

  const blogUserId = blog.user.id || blog.user
  const isBlogByCurrentUser = currentUser.id === blogUserId

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
            <Button onClick={handleLike}>Like</Button>
          </p>
          <p>{blog.user.name}</p>
          {isBlogByCurrentUser && (
            <Button onClick={handleRemove}>Remove</Button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
