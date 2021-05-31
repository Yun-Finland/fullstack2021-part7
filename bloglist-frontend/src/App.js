import React, { useEffect } from 'react'
import blogService from './services/blogs'
import Blog, { Blogs } from './components/Blog.js'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users,{ User } from './components/Users'
import { initialBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, logOut } from './reducers/userReducer'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import { initialUsers } from './reducers/usersReducer'
import { Navbar, Nav, Button } from 'react-bootstrap'

const padding = {
  paddingRight: 5
}

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

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logOut())
  }

  return (
    <div className="App container">
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav classname="mr-auto">
              <Nav.Link href="#" as="span">
                <Link style={ padding } to = '/'>Blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link sytle={ padding } to ='/users'>Users</Link>
              </Nav.Link>
              <Nav.Link>
                {user
                  ? <em style={padding}>
                      { user.name} logged in <Button variant = "secondary" onClick={handleLogout}>logout</Button>
                    </em>
                  : <Link style={padding} to='/login'>login</Link>
                }
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Notification styple={padding} id="notification" />
        {user&&(<h1 style={padding}>Blog App</h1>)}

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
    </div>
  )
}

export default App