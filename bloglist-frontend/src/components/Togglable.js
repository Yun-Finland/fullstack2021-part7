import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import  { handleStatusChange } from '../reducers/togglableReducer'
import { Button } from 'react-bootstrap'

const Togglable = ((props) => {

  const visible = useSelector(state => state.togglable)
  const dispatch = useDispatch()

  const hideWhenVisible = { display: visible? 'none' : '' }
  const showWhenVisible = { display: visible? '':'none' }

  const toggleVisibility =() => {
    dispatch(handleStatusChange(visible))
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant = "primary" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant = "primary" onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable