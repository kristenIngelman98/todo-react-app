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

  const handleLoginButtonPress = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    // login
    axios.post('http://localhost:8080/users/login', user)
      .then(response => {
        if (response.status === 200) { // successful
          // setIsLoggedIn(true)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem("authenticated", "true")
          navigate('/dashboard');
        } else {
          return
        }
      }).catch((error => {
        localStorage.setItem('authenticated', 'false')
        // setIsLoggedIn(false)
        setError('Unable to login. Please try again!')
      }))
    // reset input values  
    setUser({
      email: '',
      password: ''
    })
  }

  return (
    <>
      <LoginUI
        onInputChange={handleLogin}
        onSubmit={handleLoginButtonPress}
      />
      {error ? <Alert color="danger">{error}</Alert> : ''}
    </>
  )
}

export default Login;
