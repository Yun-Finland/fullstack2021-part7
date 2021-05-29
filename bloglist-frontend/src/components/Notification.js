import React from 'react'
import { useSelector } from 'react-redux'

const Notification =() => {
  const notify = useSelector(state => state.notify)

  if(notify === null){
    return null
  }

  return (
    <div className ={notify.style}>
      {notify.message}
    </div>
  )
}

export default Notification