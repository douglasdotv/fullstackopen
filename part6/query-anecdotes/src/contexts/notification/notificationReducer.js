export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'notification/notificationSet': {
      const { message, type } = action.payload
      return { message, type }
    }
    case 'notification/notificationCleared':
      return { message: '', type: '' }
    default:
      return state
  }
}
