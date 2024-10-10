import PropTypes from 'prop-types'

const FormInput = ({ type, value, onChange, label }) => (
  <div>
    <label>{label}</label>
    <input type={type} value={value} onChange={onChange} />
  </div>
)

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
}

export default FormInput
