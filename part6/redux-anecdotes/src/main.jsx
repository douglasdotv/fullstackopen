import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import anecdotesReducer from './reducers/anecdotesReducer'
import filterReducer from './reducers/filterReducer'
import App from './App'

const rootReducer = combineReducers({
  anecdotes: anecdotesReducer,
  filter: filterReducer,
})

const store = createStore(rootReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
