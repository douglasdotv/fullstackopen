import PropTypes from 'prop-types'

const FormInput = ({ type, value, onChange, label }) => {
  const id = label.replace(/\s+/g, '-').toLowerCase()
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={value} onChange={onChange} />
    </div>
  )
}

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

export default FormInput
