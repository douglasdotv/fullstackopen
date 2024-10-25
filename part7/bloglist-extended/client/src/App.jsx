import { Routes, Route, Navigate } from 'react-router-dom'
import BlogPage from './components/blog/BlogPage'
import UserPage from './components/user/UserPage'
import UserDetail from './components/user/UserDetail'
import Notification from './components/utils/Notification'

const App = () => (
  <>
    <Notification />
    <Routes>
      <Route path="/" element={<Navigate to="/blogs" />} />
      <Route path="/blogs" element={<BlogPage />} />
      <Route path="/users" element={<UserPage />} />
      <Route path="/users/:id" element={<UserDetail />} />
    </Routes>
  </>
)

export default App
