import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { logIn } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { failedLogin, setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [ username, setUsername ] = new useState('')
  const [ password, setPassword ] = new useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      dispatch(logIn(user))

      setUsername('')
      setPassword('')

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

    }catch (exception){
      dispatch(setNotification(failedLogin(),5))
    }

  }

  return (
    <div>
      <form onSubmit = {handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="username"
            onChange = {({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type ="text"
            value = {password}
            name = "password"
            onChange = {({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type ="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
