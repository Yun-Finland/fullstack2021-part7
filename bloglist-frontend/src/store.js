import blogReducer from './reducers/blogReducer'
import togglableReducer from './reducers/togglableReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import notificationReducer from './reducers/notificationReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  users: usersReducer,
  togglable: togglableReducer,
  notify: notificationReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)
  )
)

export default store