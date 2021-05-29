import blogService from '../services/blogs'

const blogReducer = (state=[], action) => {

  switch(action.type){
    case 'INITIAL':
      return action.data
    case 'VOTE_LIKES':
      return state.map(blog => blog.id === action.data.id ? action.data : blog)
    case 'REMOVE_BLOG':
      return state.filter(blog => Number(blog.id) !== Number(action.data) )
    case 'ADD_BLOG':
      return [...state, action.data]
    default:
      return state
    }
}

export const initialBlogs = () => {
  return async dispatch => {
    const returnedBlogs = await blogService.getAll()
    dispatch({
      type: 'INITIAL',
      data: returnedBlogs
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

export default blogReducer