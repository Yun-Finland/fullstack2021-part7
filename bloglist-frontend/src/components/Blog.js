import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { voteLikes, removeBlog, addComment } from '../reducers/blogReducer'
import { setNotification, voteNotification, removeNotification } from '../reducers/notificationReducer'
import  useComment from '../hooks/useComment'

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
    comment.resetValue()
  }

  return (
    <div className='blog'>
      <h1>{blog.title} {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes <button onClick={increaseLikes} className='likesButton'>like</button></p>
      <p>added by {blog.user.name}</p>
      { blog.user.id === user.id
          ? <button className='removeButton' onClick={removeHandle}>remove</button>
          : null
      }
      <h2>Comments</h2>
      <div>
        <form onSubmit = { handleComment } >
          <input {...comment.field}/>
          <button type='submit'>add comment</button>
        </form>

        <div>
          {blog.comments.map(comment => <li key={blog.id}>{comment}</li>)}
        </div>
      </div>
    </div>
  )
}

export const Blogs = () => {

  const blogs = useSelector(state => state.blogs)

  if(!blogs){
    return null
  }

  return (
    <div>
      { blogs.sort((a,b) => b.likes - a.likes)
        .map(blog =>
          <li key = {blog.id}>
            <Link to={`/blogs/${blog.id}`} >{blog.title} {blog.author}</Link>
          </li>
        )
      }
    </div>
  )
}

export default Blog
