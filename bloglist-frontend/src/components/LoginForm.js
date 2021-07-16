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
    <Form onSubmit = {handleLogin}>
      <h1>Log in to application </h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control {...username.field} placeholder="Enter Username" />
        <Form.Text className="text-muted">
          We will never share your info with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control {...password.field} placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit" >
        Log in
      </Button>
    </Form>
  )
}

export default LoginForm

/*
    <div>
      <h1>Log in to application </h1>
      <Form onSubmit = {handleLogin}>
        <Form.Label>Username:</Form.Label>
        <Form.Control {...username.field} />
        <Form.Label>password:</Form.Label>
        <Form.Control {...password.field} />
        <Button variant="primary" type ="submit">login</Button>
      </Form>
    </div>
*/