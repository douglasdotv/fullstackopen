const Notification = ({ message, type = 'normal' }) => {
  return (
    <div className={type === 'error' ? 'message-error' : 'message-normal'}>
      {message}
    </div>
  )
}

export default Notification
