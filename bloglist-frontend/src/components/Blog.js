import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { voteLikes, removeBlog, addComment } from '../reducers/blogReducer'
import { setNotification, voteNotification, removeNotification, commentNotification } from '../reducers/notificationReducer'
import  useComment from '../hooks/useComment'
import { Table, Button, Form, Card } from 'react-bootstrap'

const Blog = ({ blogs }) => {
  const id = useParams().id
  const blog = blogs
               ?blogs.find(blog => blog.id === id)
               :null
  if(!blog){
    return null
  }
  const comment = useComment('text')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const increaseLikes = (event) => {
    event.preventDefault()
    dispatch(voteLikes(blog))
    dispatch(setNotification(voteNotification(blog),5))
  }

  const removeHandle = (event) => {
    event.preventDefault()

    if(window.confirm('Are you sure you want to delelte this blog?')){
      dispatch(removeBlog(blog))
      dispatch(setNotification(removeNotification(blog),5))
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    const newComment = comment.field.value
    const blogObject = {
      ...blog,
      comments: blog.comments.concat(newComment)
    }
    dispatch(addComment(blogObject, newComment))
    dispatch(setNotification(commentNotification(newComment), 5))
    comment.resetValue()
  }

  return (
    <Card>
      <Card.Header as="h4">{blog.title} {blog.author}</Card.Header>
      <Card.Body>
        <a href={blog.url}>{blog.url}</a>
        <p>{blog.likes} likes <Button variant="secondary" onClick={increaseLikes} className='likesButton'>like</Button></p>
        <p>Added By User: {blog.user.name}</p>
        { blog.user.id === user.id
            ? <button className='removeButton' onClick={removeHandle}>remove</button>
            : null
        }
        <h2>Comments</h2>
        <Form onSubmit={handleComment}>
          <Form.Label>Add comment: </Form.Label>
          <Form.Control {...comment.field} />
          <Button variant="primary" type = "submit">add</Button>
        </Form>
        <div>
        {blog.comments.map(comment => <li key={blog.id}>{comment}</li>)}
        </div>
      </Card.Body>
    </Card>
  )
}

export const Blogs = () => {

  const blogs = useSelector(state => state.blogs)

  if(!blogs){
    return null
  }

  return (
    <div>
      <Table striped bordered hover responsive="lg">
        <thead>
          <tr>
            <th>#</th>
            <th>Blog Title</th>
            <th>Blog Author</th>
          </tr>
        </thead>
        <tbody>
          { blogs.sort((a,b) => b.likes - a.likes).map((blog, i) =>
            <tr key={blog.id}>
              <td>{i+1}</td>
              <td >
                <Link to={`/blogs/${blog.id}`} >{blog.title}</Link>
              </td>
              <td>
                {blog.author}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Blog
