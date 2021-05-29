import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import  { handleStatusChange } from '../reducers/togglableReducer'

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
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable