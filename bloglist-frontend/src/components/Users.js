import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Table, Card, ListGroup } from 'react-bootstrap'

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
    <Card>
      <Card.Header as="h4">User: {findUser.name}</Card.Header>
      <Card.Body>
        <ListGroup as="ul">
          {blogs.map(blog =>
            <ListGroup.Item as="li" key={blog.id} >
              <Link to={`/blogs/${blog.id}`} >
                {blog.title}
              </Link>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card.Body>
      <Card.Footer>Total {blogs.length} blogs have been added!</Card.Footer>
    </Card>
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
      <Table striped bordered hover responsive="lg" >
        <tbody>
          <tr>
            <th>#</th>
            <th>Users</th>
            <th>Blogs Created Number</th>
          </tr>
          {tableData.map((user,i) =>
            <tr key={user.id}>
              <td>{i + 1}</td>
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
