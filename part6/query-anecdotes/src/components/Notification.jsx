import { useNotificationState } from '../contexts/notification/useNotificationHooks'

const Notification = () => {
  const { message, type } = useNotificationState()

  if (!message) {
    return null
  }

  const style = {
    padding: '15px',
    borderRadius: '10px',
    fontFamily: '"VT323", monospace',
    fontSize: '1.2rem',
    color: type === 'error' ? '#ff4d4d' : '#66ff66',
    backgroundColor: type === 'error' ? '#330000' : '#003300',
    border: type === 'error' ? '2px solid #ff4d4d' : '2px solid #66ff66',
    boxShadow:
      type === 'error'
        ? '0 0 10px #ff4d4d, 0 0 20px #ff0000'
        : '0 0 10px #66ff66, 0 0 20px #00ff00',
    textShadow: type === 'error' ? '2px 2px #ff4d4d' : '2px 2px #66ff66',
  }

  return <div style={style}>{message}</div>
}

export default Notification
