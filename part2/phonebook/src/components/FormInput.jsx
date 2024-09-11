const FormInput = ({ label, value, onChange }) => (
  <div>
    <label>
      {label + ': '}
      <input value={value} onChange={onChange} />
    </label>
  </div>
)

export default FormInput
