import { useEffect } from 'react'
import { useMatch, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../../store/slices/usersSlice'
import SectionTitle from '../common/SectionTitle'

const UserDetail = () => {
  const match = useMatch('/users/:id')
  const userId = match?.params?.id

  const dispatch = useDispatch()
  const user = useSelector(state =>
    state.users.find(user => user.id === userId)
  )

  useEffect(() => {
    if (!user) {
      dispatch(initializeUsers())
    }
  }, [dispatch, user])

  if (!user) {
    return <p>Loading user details...</p>
  }

  return (
    <div>
      <SectionTitle text={user.name} level={2} />
      <ul>
        {user.blogs && user.blogs.length > 0 ? (
          user.blogs.map(blog => (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))
        ) : (
          <p>No blog posts available for this user.</p>
        )}
      </ul>
    </div>
  )
}

export default UserDetail
