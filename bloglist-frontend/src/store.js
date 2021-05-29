import blogReducer from './reducers/blogReducer'
import togglableReducer from './reducers/togglableReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  togglable: togglableReducer,
  notify: notificationReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store