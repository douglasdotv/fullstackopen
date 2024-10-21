const Heading = ({ level = 1, children }) => {
  const Tag = `h${level}`
  return <Tag>{children}</Tag>
}

export default Heading
