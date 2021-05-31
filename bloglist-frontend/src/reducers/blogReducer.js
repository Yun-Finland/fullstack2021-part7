import blogService from '../services/blogs'

const blogReducer = (state=null, action) => {
  switch(action.type){
    case 'INITIAL_BLOGS':
      return action.data
    case 'VOTE_LIKES':
      return state.map(blog => blog.id === action.data.id ? action.data : blog)
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.data )
    case 'ADD_BLOG':
      return [...state, action.data]
    case 'ADD_COMMENT':
      return state.map(blog => blog.id === action.id ? action.blog:blog)
    default:
      return state
    }
}

export const initialBlogs = () => {
  return async dispatch => {
    const returnedBlogs = await blogService.getAll()
    dispatch({
      type: 'INITIAL_BLOGS',
      data: returnedBlogs,
    })
  }
}

export const voteLikes = (blog) => {
  return async dispatch => {
    const newObject = { ...blog, 'likes': blog.likes+1 }
    const returnedObject = await blogService.update(blog.id, newObject)
    dispatch({
      type: 'VOTE_LIKES',
      data: returnedObject
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    const deleteId = blog.id
    await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: deleteId
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      data: blog
    })
  }
}

export const addComment = (blogObject, comment) => {
  return async dispatch => {
    const id = blogObject.id
    await blogService.createComment(id, comment)
    dispatch({
      type: 'ADD_COMMENT',
      id: id,
      blog: blogObject
    })
  }
}

export default blogReducer