import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addNotification, setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'
import { handleStatusChange } from '../reducers/togglableReducer'

const BlogForm = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const visible = useSelector(state => state.visible)

  const [ title, setTitle ] = new useState('')
  const [ author, setAuthor ] = new useState('')
  const [ url, setUrl ] = new useState('')

  const addNewBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
      user: user.id,
    }
    dispatch(addBlog(blogObject))
    dispatch(handleStatusChange(visible))
    dispatch(setNotification(addNotification(blogObject), 5))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={addNewBlog}>
        <h1>create new blog</h1>
        <div>
          Title:
          <input
            id="title"
            type = "text"
            value = {title}
            name = "title"
            onChange = {({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            id="author"
            type = "text"
            value = {author}
            name = "author"
            onChange = {({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type = "text"
            value = {url}
            name = "url"
            onChange = {({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='createBlog' type = "submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm