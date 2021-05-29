import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteLikes, removeBlog } from '../reducers/blogReducer'
import { setNotification, voteNotification, removeNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

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

  const showRestInfo = () => {
    return (
      <div className="showAllInfo">
        {blog.url}<br/>
        likes: {blog.likes} <button onClick={increaseLikes} className='likesButton'>like</button><br/>
        { blog.user.username }<br/>
        { blog.user.id === user.id
          ? <button className='removeButton' onClick={removeHandle}>remove</button>
          : null
        }
      </div>
    )
  }

  const statusChange = () => {setVisible(!visible)}

  return (
    <div className='blog'>
      {blog.title}, {blog.author} <button className="showOrHide" onClick={statusChange}>{visible?'hide' : 'view'}</button>
      { visible
        ? <div > {showRestInfo()} </div>
        : null
      }
    </div>
  )
}

export const Blogs = () => {

  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      { blogs
        .sort((a,b) => b.likes - a.likes)
        .map(blog =>  <ul key = {blog.id}> <Blog blog ={blog} /> </ul>)
      }
    </div>
  )
}

export default Blog