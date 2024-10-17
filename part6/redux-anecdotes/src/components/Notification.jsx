import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return null
  }

  const style = {
    border: '2px solid #ff00ff',
    padding: 15,
    borderRadius: '10px',
    backgroundColor: '#000080',
    color: '#00ffff',
    fontFamily: '"VT323", monospace',
    fontSize: '1.2rem',
    textShadow: '2px 2px #ff00ff',
    boxShadow: '0 0 10px #00ffff, 0 0 20px #ff00ff',
  }

  return <div style={style}>{notification}</div>
}

export default Notification
