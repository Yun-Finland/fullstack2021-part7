import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addNotification, setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'
import { handleStatusChange } from '../reducers/togglableReducer'
import useField from '../hooks/useField'

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
      <form onSubmit={addNewBlog}>
        <h1>create new blog</h1>
        <div>
          Title: <input {...title.field}/>
        </div>
        <div>
          Author: <input {...author.field} />
        </div>
        <div>
          url: <input {...url.field} />
        </div>
        <button id='createBlog' type = "submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm