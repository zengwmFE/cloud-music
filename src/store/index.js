import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
const composeEnhancers =
  window.__REDUX__DEVTOOLS__EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
export default store
