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
    message: `Thanks for your Likes of blog ${blog.title}, written by ${blog.author}`,
    style: 'success'
  }
}

export const addNotification = (blog) => {
  return {
    message: `A new blog ${blog.title}, Written by ${blog.author} added`,
    style: 'success'
  }
}

export const commentNotification = (comment) => {
  return {
    message: `Your comment: "${comment}" has been added`,
    style: 'success'
  }
}

export const removeNotification = (blog) => {
  return  {
    message: `Blog ${blog.title} ${blog.author} has been removed successfully`,
    style: 'danger'
  }
}

export const failedLogin = () => {
  return  {
    message: 'wrong username or password',
    style: 'danger'
  }
}

export const successLogin = (user) => {
  return  {
    message: `Welcome ${user.name}`,
    style: 'success'
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