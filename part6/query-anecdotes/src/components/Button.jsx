const Button = ({ type = 'button', onClick, children, ...rest }) => (
  <button type={type} onClick={onClick} {...rest}>
    {children}
  </button>
)

export default Button
