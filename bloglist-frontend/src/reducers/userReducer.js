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
  return {
    type:'LOGGED_IN',
    data: user
  }
}

export const logOut = () => {
  return {
      type:'LOG_IN',
  }
}

export default userReducer