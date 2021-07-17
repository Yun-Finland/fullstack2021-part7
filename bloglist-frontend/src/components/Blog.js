import React,{ useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { voteLikes, removeBlog, addComment } from '../reducers/blogReducer'
import { setNotification, voteNotification, removeNotification, commentNotification } from '../reducers/notificationReducer'
import  useComment from '../hooks/useComment'
import { Table, Button, Form, Card, Row, Col, ButtonGroup } from 'react-bootstrap'
import { FaRegHeart, FaLink, FaBlogger, FaUserEdit, FaRegCommentAlt, FaRegTrashAlt } from 'react-icons/fa'
import { FiFilePlus } from 'react-icons/fi'

const Blog = ({ blogs }) => {
  const [viewComment, setViewComment] = useState(false)
  const id = useParams().id
  const blog = blogs
               ?blogs.find(blog => blog.id === id)
               :null

  const comment = useComment('text')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const increaseLikes = (event) => {
    event.preventDefault()
    dispatch(setNotification(voteNotification(blog),5))
    dispatch(voteLikes(blog))
  }

  const removeHandle = (event) => {
    event.preventDefault()

    if(window.confirm('Are you sure you want to delelte this blog?')){
      dispatch(setNotification(removeNotification(blog),5))
      dispatch(removeBlog(blog))
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    const newComment = comment.field.value
    const blogObject = {
      ...blog,
      comments: blog.comments.concat(newComment)
    }
    dispatch(setNotification(commentNotification(newComment), 5))
    dispatch(addComment(blogObject, newComment))
    comment.resetValue()
  }

  const viewRemoveButton = () => {
    if(blog.user.id === user.id){
      return(<Button variant="secondary" onClick={removeHandle}><FaRegTrashAlt/> Delete </Button>)
    }
    return null
  }

  const viewCommentContent = () => {
    if(viewComment){
      return (
        <Card >
          <Card.Body>
          <div className ="d-grid gap-3">
            {blog.comments.map(comment =>
              <div className="p-2 bg-light border mb-3"  key={blog.id} >
                {comment}
              </div>
            )}
          </div>
          <Form onSubmit={handleComment}>
            <Row className="align-items-center">
              <Col >
              <Form.Control as="textarea" rows={2} {...comment.field} placeholder="Write a comment"/>
              </Col>
              <Col xs="auto">
              <Button variant="outline-secondary" id="button-addon2" type = "submit">add</Button>
              </Col>
            </Row>
          </Form>
          </Card.Body>
        </Card>
      )
    }

    return null
  }

  if(!blog){
    return null
  }

  return (
    <Card>
      <Card.Header as="h4">
        <Card.Text><FaBlogger/> {blog.title} </Card.Text>
        <Card.Subtitle><FaUserEdit/> {blog.author} </Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text><FaLink/> Link: <a href={blog.url}>{blog.url}</a> </Card.Text>
        <Card.Text> <FiFilePlus /> Added By User: {blog.user.name}</Card.Text>
        <ButtonGroup aria-label="Basic example">
          <Button onClick={increaseLikes} className='likesButton' variant="secondary"> <FaRegHeart/> {blog.likes} Likes</Button>
          <Button variant="secondary" onClick={() => setViewComment(!viewComment)}>
            <FaRegCommentAlt/> {blog.comments.length} Comments
          </Button>
          { viewRemoveButton() }
        </ButtonGroup>
        {viewCommentContent()}
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

