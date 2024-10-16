const initialState = {
  goodCount: 0,
  okCount: 0,
  badCount: 0,
}

const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'feedback/goodReceived':
      return {
        ...state,
        goodCount: state.goodCount + 1,
      }
    case 'feedback/okReceived':
      return {
        ...state,
        okCount: state.okCount + 1,
      }
    case 'feedback/badReceived':
      return {
        ...state,
        badCount: state.badCount + 1,
      }
    case 'feedback/reset':
      return initialState
    default:
      return state
  }
}

export default feedbackReducer
