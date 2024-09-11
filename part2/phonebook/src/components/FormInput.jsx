const FormInput = ({ name, label, value, onChange }) => (
  <div>
    <label>
      {label + ': '}
      <input name={name} value={value} onChange={onChange} />
    </label>
  </div>
)

export default FormInput
