const Heading = ({ level = 2, children, ...rest }) => {
  const Tag = `h${level}`
  return <Tag {...rest}>{children}</Tag>
}

export default Heading
