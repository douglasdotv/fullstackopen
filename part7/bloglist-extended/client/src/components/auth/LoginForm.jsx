import { useState } from 'react'
import PropTypes from 'prop-types'
import Form from '../common/Form'
import FormInput from '../common/FormInput'
import Button from '../common/Button'
import SectionTitle from '../common/SectionTitle'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    onLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <SectionTitle text="Please log in to the application" level={2} />
      <Form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          label="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <FormInput
          type="password"
          label="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button type="submit">Login</Button>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
}

export default LoginForm
