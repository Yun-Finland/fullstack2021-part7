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
import { Route, Switch, Redirect } from 'react-router-dom'
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
      <Togglable buttonLabel="Create a new blog">
        <BlogForm />
      </Togglable>
    )
  }

  const logHeader = () => {
    if(user){
      return(
        <div>
          <Navbar.Text> Logged in as: { user.name} </Navbar.Text>
          <Button variant = "secondary" onClick={handleLogout}>Logout</Button>
        </div>
      )
    }

    return (
      <Nav.Link to='/login' style={padding}>Login</Nav.Link>
    )
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logOut())
  }

  return (
    <div className="App container">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav classname="mr-auto" >
            <Nav.Link href="/" >Blogs</Nav.Link>
            <Nav.Link href="/users">Users</Nav.Link>
            {logHeader()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Notification style={padding} id="notification" />
      <br/>{user&&(<h1 style={padding}>Blog App</h1>)}<br/>

      <Switch>
        <Route path="/blogs/:id">
          {user ? <Blog blogs={blogs} /> : <LoginForm />}
        </Route>

        <Route path="/users/:id">
          {user ? <User users= {users} /> : <LoginForm />}
        </Route>

        <Route path="/users">
          {user ? <Users users = {users} /> : <LoginForm />}
        </Route>

        <Route path='/login'>
          {user ? <Redirect to ='/' /> : <LoginForm />}
        </Route>

        <Route path="/">
          {user
            ? <div>
                <Blogs />
                <br/>
                {blogForm()}
              </div>
            : <Redirect to='/login' />
          }
        </Route>
      </Switch>

    </div>
  )
}

export default App

/*
      <Navbar fixed="bottom">
        <Navbar.Text>Bloglist App - An example application made with Fullstack - Made with love by Yun Xiao @2021</Navbar.Text>
      </Navbar>
      */