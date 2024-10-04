const FormInput = ({ type, value, onChange, label }) => (
  <div>
    <label>{label}</label>
    <input type={type} value={value} onChange={onChange} />
  </div>
)

export default FormInput
