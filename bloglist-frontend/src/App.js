import React, { useEffect } from 'react'
import blogService from './services/blogs'
import Blog, { Blogs } from './components/Blog.js'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Menu from './components/Menu'
import Users,{ User } from './components/Users'
import { initialBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { logIn } from './reducers/userReducer'
import { Switch, Route, Redirect } from 'react-router-dom'
import { initialUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const notify = useSelector(state => state.notify)

  useEffect (() => {
    dispatch(initialBlogs())
    dispatch(initialUsers())
  }, [notify])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const returnedUser = JSON.parse(loggedUserJSON)
      dispatch(logIn(returnedUser))
      blogService.setToken(returnedUser.token)
    }
  },[])

  const blogForm = () => {
    return(
      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>
    )
  }

  return (
    <div className="App">
      <div>
        {user === null
          ? <h1>Log in to application </h1>
          : <Menu user={user}/>
        }
      </div>
      <Notification id="notification" />

      <Switch>
        <Route path="/blogs/:id">
          <Blog blogs={blogs} />
        </Route>

        <Route path="/users/:id">
          <User users= {users} />
        </Route>

        <Route path="/users">
          <Users users = {users} />
        </Route>

        <Route path='/login'>
          {user ? <Redirect to ='/' /> : <LoginForm />}
        </Route>

        <Route path="/">
          {user
            ? <div>
                {blogForm()}
                <Blogs />
              </div>
            : <Redirect to='/login' />
          }
        </Route>
      </Switch>
    </div>
  )
}

export default App
