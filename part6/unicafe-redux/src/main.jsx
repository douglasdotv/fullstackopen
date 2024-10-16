import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD',
    })
  }

  return (
    <div>
      <button onClick={good}>Good</button>
      <button>Ok</button>
      <button>Bad</button>
      <button>Reset stats</button>
      <div>Good {store.getState().good}</div>
      <div>Ok</div>
      <div>Bad</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
