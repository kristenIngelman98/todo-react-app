import { ChangeEvent, FormEvent, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Login from './Login';


const LoginSmart = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const navigate = useNavigate();

    const handleLoginButtonPress = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        axios.post('http://localhost:8080/users/login', { email: userEmail, password: userPassword })
          .then(response => {
            console.log(response.data.token)
            console.log(response.status)
    
            if (response.status === 200) {
              console.log(response.status)
              setIsLoggedIn(true)
              localStorage.setItem('token', response.data.token)
              localStorage.setItem("authenticated", "true")
              console.log(localStorage)
              navigate('/dashboard');
            } else {
              console.log(response.status)
              localStorage.setItem('authenticated', 'false')
              console.log(localStorage)
              setIsLoggedIn(false)
            }
          }).catch(error => console.log(error))
    
        setUserEmail("")
        setUserPassword("")
      }
    
      // when login details are changed E.g. input of email or password
      const handleLogin = (event: ChangeEvent<HTMLInputElement>) => {
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
            <Login
                onInputChange={handleLogin}
                onSubmit={handleLoginButtonPress}
            />
        </>

    )

}

export default LoginSmart;
