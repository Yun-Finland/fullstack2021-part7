import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addNotification, setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'
import { handleStatusChange } from '../reducers/togglableReducer'
import useField from '../hooks/useField'
import { Form, Button, Card } from 'react-bootstrap'

const BlogForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const visible = useSelector(state => state.visible)

  const title = useField('title','text')
  const author = useField('author','text')
  const url = useField('url', 'text')

  const addNewBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title.field.value,
      author: author.field.value,
      url: url.field.value,
      user: user.id,
    }
    dispatch(addBlog(blogObject))
    dispatch(handleStatusChange(visible))
    dispatch(setNotification(addNotification(blogObject), 5))

    title.resetValue()
    author.resetValue()
    url.resetValue()
  }

  return (
    <Card>
      <Card.Header as="h5">Create New Blog</Card.Header>
      <Card.Body>
        <Form onSubmit = {addNewBlog}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Blog Title</Form.Label>
            <Form.Control {...title.field} placeholder="Enter the Title " />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Blog Author</Form.Label>
            <Form.Control {...author.field} placeholder="Enter the Author" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Blog Url</Form.Label>
            <Form.Control {...url.field} placeholder="Enter the url" />
          </Form.Group>
          <Button variant="primary" id='createBlog' type = "submit">Create</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default BlogForm

/*
      <Form onSubmit={addNewBlog}>
        <h1>create new blog</h1>
        <Form.Label>Title: </Form.Label>
        <Form.Control {...title.field}/>
        <Form.Label>Author: </Form.Label>
        <Form.Control {...author.field} />
        <Form.Label>Url:</Form.Label>
        <Form.Control {...url.field} />
        <Button variant="primary" id='createBlog' type = "submit">create</Button>
      </Form>
*/