import { Link } from 'react-router-dom'

const Menu = () => {
  const linkStyle = {
    paddingRight: 5,
  }

  return (
    <div>
      <Link to="/" style={linkStyle}>
        Anecdotes
      </Link>
      <Link to="/create" style={linkStyle}>
        Create
      </Link>
      <Link to="/about" style={linkStyle}>
        About
      </Link>
    </div>
  )
}

export default Menu
