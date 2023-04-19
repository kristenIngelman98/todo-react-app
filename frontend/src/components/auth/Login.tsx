import { ChangeEvent, FormEvent, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginUI from './LoginUI';
import { Alert } from 'reactstrap';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();


  // change name to handleChange or handleLoginChange or handleInputChange
  // when login details are changed E.g. input of email or password
  const handleLogin = (event: ChangeEvent<HTMLInputElement>) => {
    setError('') // reset error

    if (event.target.type === "email") {
      setUser({
        email: event.target.value,
        password: user.password
      });
    }
    if (event.target.type === "password") {
      setUser({
        email: user.email,
        password: event.target.value
      });
    }
  }

  const handleLoginButtonPress = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json()
      console.log('login successful', responseData)
      localStorage.setItem('token', responseData.token)
      localStorage.setItem("authenticated", "true")
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating post: ', error)
      localStorage.setItem('authenticated', 'false')
      // setIsLoggedIn(false)
      setError('Unable to login. Please try again!')
    }
  }

  return (
    <>
      <LoginUI
        onInputChange={handleLogin}
        onSubmit={handleLoginButtonPress}
        // className={className}
      />
      {error ? <Alert color="danger">{error}</Alert> : ''}
    </>
  )
}

export default Login;