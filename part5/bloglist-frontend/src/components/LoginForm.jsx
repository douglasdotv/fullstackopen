import { useState } from 'react'
import FormInput from './FormInput'
import Button from './Button'
import SectionTitle from './SectionTitle'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <SectionTitle text="Please log in to the application" level={2} />
      <form onSubmit={handleSubmit}>
        <div>
          <FormInput
            type="text"
            label="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <FormInput
            type="password"
            label="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}

export default LoginForm
