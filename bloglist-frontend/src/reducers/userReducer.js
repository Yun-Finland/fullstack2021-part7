const userReducer = (state=null, action) => {
  switch(action.type){
    case 'LOGGED_IN':
      return action.data
    case 'LOG_IN':
      return null
    default:
      return state
  }
}

export const logIn = (user) => {
  return dispatch => {
      dispatch({
        type:'LOGGED_IN',
        data: user
      })
  }
}

export const logOut = () => {
  return dispatch => {
    dispatch({
      type:'LOG_IN',
    })
  }
}

export default userReducer