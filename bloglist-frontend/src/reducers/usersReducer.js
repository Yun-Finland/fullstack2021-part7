import userService from '../services/users'

const usersReducer = (state=null, action) => {
  switch(action.type){
    case 'ALL_USERS':
      return action.data
    default:
      return state
  }
}

export const initialUsers = () => {
  return async dispatch => {
    const returnedUsers = await userService.getAll()
    dispatch({
      type: 'ALL_USERS',
      data: returnedUsers
    })
  }
}

export default usersReducer