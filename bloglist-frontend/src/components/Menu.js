import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Menu = ({ user }) => {
  const dispatch = useDispatch()

  const padding = {
    paddingRight: 5
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logOut())
  }

  return (
    <div>
      <Link to="/" style={padding}>Blogs</Link>
      <Link to="/users" style ={padding}>Users</Link>
      { user.name} logged in <button onClick={handleLogout}>logout</button>
      <h1>Blog app</h1>
    </div>
  )
}

export default Menu
