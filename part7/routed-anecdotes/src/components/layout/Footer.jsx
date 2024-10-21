const Footer = () => {
  const style = {
    background: '#F0F0F0',
    color: '#333333',
    fontSize: 16,
    fontFamily: "'Press Start 2P', 'Orbitron', monospace",
    borderStyle: 'solid',
    borderColor: '#00FFFF',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    boxShadow: '0 0 5px #00FFFF',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)',
  }

  return (
    <div style={style}>
      Anecdote app for{' '}
      <a href="https://fullstackopen.com/en/part7">Full Stack Open part7</a>
    </div>
  )
}

export default Footer
