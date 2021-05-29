const togglableReducer = (state=false, action) => {

  switch(action.type){
    case 'HIDE':
      return false
    case 'SHOW':
      return true
    default:
      return state
  }

}

export const handleStatusChange = (visible) => {
  return dispatch => {
    if (visible){
      dispatch({
        type: 'HIDE'
      })
    }else{
      dispatch({
        type: 'SHOW'
      })
    }
  }
}

export default togglableReducer