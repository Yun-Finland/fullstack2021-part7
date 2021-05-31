import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'

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
      <Table striped>
        <tbody>
          <h1>{findUser.name}</h1>
          <h3>added blogs</h3>
          {blogs.map(blog =>
            <tr key={blog.id}>
             <td>{blog.title}</td>
            </tr>
          )}
        </tbody>
      </Table>
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
      <Table striped >
        <tbody>
          <tr>
            <td></td>
            <th>blogs created</th>
          </tr>
          {tableData.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
