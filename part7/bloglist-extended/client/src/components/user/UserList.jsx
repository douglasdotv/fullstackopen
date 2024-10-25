import { useSelector } from 'react-redux'
import User from './User'
import SectionTitle from '../common/SectionTitle'

const UserList = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <SectionTitle text="Users" level={2} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
