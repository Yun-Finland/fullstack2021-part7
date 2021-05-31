import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification =() => {
  const notify = useSelector(state => state.notify)

  if(notify === null){
    return null
  }

  return (
    <div className = "container">
      <Alert variant={notify.style}>
        {notify.message}
      </Alert>
    </div>
  )
}

export default Notification