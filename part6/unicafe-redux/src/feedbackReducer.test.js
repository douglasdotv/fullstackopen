import deepFreeze from 'deep-freeze'
import feedbackReducer from './feedbackReducer'

describe('Feedback reducer', () => {
  const initialState = {
    goodCount: 0,
    okCount: 0,
    badCount: 0,
  }

  test('Should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'feedback/unknownAction',
    }

    const newState = feedbackReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('Should increment good count', () => {
    const action = {
      type: 'feedback/goodReceived',
    }
    const state = initialState

    deepFreeze(state)
    const newState = feedbackReducer(state, action)
    expect(newState).toEqual({
      goodCount: 1,
      okCount: 0,
      badCount: 0,
    })
  })

  test('Should increment ok count', () => {
    const action = {
      type: 'feedback/okReceived',
    }
    const state = initialState

    deepFreeze(state)
    const newState = feedbackReducer(state, action)
    expect(newState).toEqual({
      goodCount: 0,
      okCount: 1,
      badCount: 0,
    })
  })

  test('Should increment bad count', () => {
    const action = {
      type: 'feedback/badReceived',
    }
    const state = initialState

    deepFreeze(state)
    const newState = feedbackReducer(state, action)
    expect(newState).toEqual({
      goodCount: 0,
      okCount: 0,
      badCount: 1,
    })
  })

  test('Should reset all counts to zero', () => {
    const action = {
      type: 'feedback/reset',
    }
    const state = {
      goodCount: 2,
      okCount: 1,
      badCount: 3,
    }

    deepFreeze(state)
    const newState = feedbackReducer(state, action)
    expect(newState).toEqual({
      goodCount: 0,
      okCount: 0,
      badCount: 0,
    })
  })
})
