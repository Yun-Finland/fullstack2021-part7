import React, { useEffect } from 'react'
import blogService from './services/blogs'
import { Blogs } from './components/Blog.js'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { initialBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, logOut } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const notify = useSelector(state => state.notify)

  useEffect (() => {
    dispatch(initialBlogs())
  }, [notify])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const returnedUser = JSON.parse(loggedUserJSON)
      dispatch(logIn(returnedUser))
      blogService.setToken(returnedUser.token)
    }
  },[])

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logOut())
  }

  const blogForm = () => {
    return(
      <Togglable buttonLabel="create new blog">
        <BlogForm />
      </Togglable>
    )
  }

  return (
    <div className="App">
      <h1> {user === null ? 'Log in to application' : 'Blogs' } </h1>
      <Notification id="notification" />

      {user === null
        ? <LoginForm />
        : <div>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
            { blogForm() }
            <Blogs />
          </div>
      }
    </div>
  )
}

export default App
