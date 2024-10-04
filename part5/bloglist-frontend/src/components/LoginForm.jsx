import Form from './Form'
import FormInput from './FormInput'
import Button from './Button'
import SectionTitle from './SectionTitle'

const LoginForm = ({
  onLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <div>
      <SectionTitle text="Please log in to the application" level={2} />
      <Form onSubmit={onLogin}>
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

export default LoginForm
