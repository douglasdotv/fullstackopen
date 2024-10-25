import PropTypes from 'prop-types'

const SectionTitle = ({ text, level = 1 }) => {
  const Heading = `h${level}`
  return <Heading>{text}</Heading>
}

SectionTitle.propTypes = {
  text: PropTypes.string.isRequired,
  level: PropTypes.number,
}

export default SectionTitle
