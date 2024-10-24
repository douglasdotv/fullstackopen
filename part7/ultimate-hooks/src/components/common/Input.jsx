const Input = ({ label, ...props }) => (
  <div>
    {label && <label>{label}</label>}
    <input {...props} />
  </div>
)

export default Input
