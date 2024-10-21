const Notification = ({ message, type }) => {
  if (!message) {
    return null
  }

  const style = {
    color: '#FFFFFF',
    background: type === 'error' ? '#FF6347' : '#32CD32',
    fontSize: 16,
    fontWeight: 'bold',
    borderStyle: 'solid',
    borderColor: type === 'error' ? '#FF4500' : '#228B22',
    borderRadius: 8,
    padding: '15px 20px',
    marginBottom: 15,
  }

  return (
    <div style={style}>
      {type === 'success' ? '✔️' : '⚠️'}
      <span>{message}</span>
    </div>
  )
}

export default Notification
