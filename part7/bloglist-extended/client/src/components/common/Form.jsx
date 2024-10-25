import PropTypes from 'prop-types'

const Form = ({ onSubmit, children }) => {
  const handleSubmit = e => {
    e.preventDefault()
    onSubmit()
  }

  return <form onSubmit={handleSubmit}>{children}</form>
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default Form
