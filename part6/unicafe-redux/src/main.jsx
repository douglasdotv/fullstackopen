import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import feedbackReducer from './feedbackReducer'

const store = configureStore({ reducer: feedbackReducer })

const App = () => {
  const dispatchGoodReceived = () => {
    store.dispatch({ type: 'feedback/goodReceived' })
  }
  const dispatchOkReceived = () => {
    store.dispatch({ type: 'feedback/okReceived' })
  }
  const dispatchBadReceived = () => {
    store.dispatch({ type: 'feedback/badReceived' })
  }
  const dispatchReset = () => {
    store.dispatch({ type: 'feedback/reset' })
  }

  return (
    <div>
      <button onClick={dispatchGoodReceived}>Good</button>
      <button onClick={dispatchOkReceived}>Ok</button>
      <button onClick={dispatchBadReceived}>Bad</button>
      <button onClick={dispatchReset}>Reset stats</button>
      <div>Good: {store.getState().goodCount}</div>
      <div>Ok: {store.getState().okCount}</div>
      <div>Bad: {store.getState().badCount}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
