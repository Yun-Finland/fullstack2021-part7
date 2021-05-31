import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { logIn } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { failedLogin, setNotification, successLogin } from '../reducers/notificationReducer'
import useField from '../hooks/useField'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()

  const username = useField('username','text')
  const password = useField('password','password')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: username.field.value,
        password: password.field.value,
      })
      blogService.setToken(user.token)
      dispatch(logIn(user))
      dispatch(setNotification(successLogin(user),5))
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
      <h1>Log in to application </h1>
      <Form onSubmit = {handleLogin}>
        <Form.Label>username:</Form.Label>
        <Form.Control {...username.field} />
        <Form.Label>password:</Form.Label>
        <Form.Control {...password.field} />
        <Button variant="primary" type ="submit">login</Button>
      </Form>
    </div>
  )
}

export default LoginForm