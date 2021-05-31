import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addNotification, setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'
import { handleStatusChange } from '../reducers/togglableReducer'
import useField from '../hooks/useField'
import { Form, Button } from 'react-bootstrap'

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
      author: author.field.vlaue,
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
    <div>
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
    </div>
  )
}

export default BlogForm