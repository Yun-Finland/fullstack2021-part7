import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { logIn } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { failedLogin, setNotification } from '../reducers/notificationReducer'
import useField from '../hooks/useField'

const LoginForm = () => {
  const dispatch = useDispatch()

  const username = useField('username','text')
  const password = useField('password','text')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.field.value,
        password: password.field.value,
      })
      blogService.setToken(user.token)
      dispatch(logIn(user))
      username.resetValue()
      password.resetValue()

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
          username <input {...username.field} />
        </div>
        <div>
          password <input {...password.field} />
        </div>
        <button id='login-button' type ="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm