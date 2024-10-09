import { useState } from 'react'
import Button from './Button'

const Blog = ({ blog }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false)

  const toggleDetails = () => setIsDetailsVisible(!isDetailsVisible)

  return (
    <div>
      {blog.title} {blog.author}
      <Button onClick={toggleDetails}>
        {isDetailsVisible ? 'Hide' : 'View'}
      </Button>
      {isDetailsVisible && (
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
