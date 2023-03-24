import { ChangeEvent, FormEvent, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginUI from './LoginUI';
import { Alert } from 'reactstrap';

const Login = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState('')

    const navigate = useNavigate();

    const handleLoginButtonPress = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // login w/ email and password
        axios.post('http://localhost:8080/users/login', { email: userEmail, password: userPassword })
          .then(response => {
            if (response.status === 200) {
              setIsLoggedIn(true)
              localStorage.setItem('token', response.data.token)
              localStorage.setItem("authenticated", "true")
              navigate('/dashboard');
            } else { // this never gets reaches here?!
              localStorage.setItem('authenticated', 'false')
              setIsLoggedIn(false)
              return // remove above lines?!
            }
          }).catch((error => {
            localStorage.setItem('authenticated', 'false')
            setIsLoggedIn(false)
            setError('Unable to login. Please try again!')
          }))
        setUserEmail("") // reset input values  
        setUserPassword("")
      }
    
      // when login details are changed E.g. input of email or password
      const handleLogin = (event: ChangeEvent<HTMLInputElement>) => {
        setError('') // reset error

        let email: string = ''
        let password: string = ''
    
        if (event.target.type === "email") {
          email = event.target.value
          setUserEmail(email)
        }
        if (event.target.type === "password") {
          password = event.target.value;
          setUserPassword(password)
        }
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
