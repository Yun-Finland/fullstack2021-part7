import React from 'react'
import { Link, useParams } from 'react-router-dom'

export const User = ({ users }) => {
  if(!users){
    return null
  }
  const id = useParams().id
  const findUser = users
                    ?users.find(n => n.id === id)
                    :null
  if(!findUser){
    return null
  }

  const blogs = findUser.blogs

  return(
    <div>
      <h1>{findUser.name}</h1>
      <h3>added blogs</h3>
      {blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
    </div>
  )
}

const Users = ({ users }) => {

  if(!users){
    return null
  }

  const tableData = users.map(user => {
    return {
      name: user.name,
      id:user.id,
      length: user.blogs.length
    }
  })

  return(
    <div>
      <h1>Users</h1>
      <table >
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {tableData.map(user =>
          <tr key={user.id}>
            <th><Link to={`/users/${user.id}`}>{user.name}</Link></th>
            <th>{user.length}</th>
          </tr>
        )}
      </table>
    </div>
  )
}

export default Users
/*
{ users.map(user =>
  <ul key={user.id}>
    <Link to={`/users/${user.id}`}>{user.name}</Link>
  </ul>)}
*/