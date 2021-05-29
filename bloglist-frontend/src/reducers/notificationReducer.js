const notificationReducer = (state=null, action) => {
  switch(action.type){
    case 'SHOW_NOTIFICATION':
      return action.data
    case 'HIDE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const voteNotification = (blog) => {
  return {
    message: `Likes of blog ${blog.title} ${blog.author} is increased by 1`,
    style: 'success'
  }
}

export const addNotification = (blog) => {
  return {
    message: `a new blog ${blog.title} ${blog.author} added`,
    style: 'success'
  }
}

export const removeNotification = (blog) => {
  return  {
    message: `Blog ${blog.title} ${blog.author} has been removed successfully`,
    style: 'error'
  }
}

export const failedLogin = () => {
  return  {
    message: 'wrong username or password',
    style: 'error'
  }
}

let timeout

export const setNotification = (data, duration) => {
  clearTimeout(timeout)
  return dispatch => {
    dispatch({
      type:'SHOW_NOTIFICATION',
      data: data
    })

    timeout = setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION'
      })
    },duration*1000)
  }
}

export default notificationReducer