// import { ChangeEvent, FormEvent, useState } from "react";
// import axios from 'axios';
// import Login from "./components/Login";
// import SignUp from "./components/SignUp";
// import { useNavigate } from 'react-router-dom';

export default function App() {
  // const [userEmail, setUserEmail] = useState('');
  // const [userPassword, setUserPassword] = useState('')
  // const [userName, setUserName] = useState('')

  // const [newUserEmail, setNewUserEmail] = useState('')
  // const [newUserPassword, setNewUserPassword] = useState('')

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();

  // const handleLoginButtonPress = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   axios.post('http://localhost:8080/users/login', { email: userEmail, password: userPassword })
  //     .then(response => {
  //       console.log(response.data.token)
  //       console.log(response.status)

  //       if (response.status === 200) {
  //         console.log(response.status)
  //         setIsLoggedIn(true)
  //         localStorage.setItem('token', response.data.token)
  //         localStorage.setItem("authenticated", "true")
  //         console.log(localStorage)
  //         navigate('/dashboard');
  //       } else {
  //         console.log(response.status)
  //         localStorage.setItem('authenticated', 'false')
  //         console.log(localStorage)
  //         setIsLoggedIn(false)
  //       }
  //     }).catch(error => console.log(error))

  //   setUserEmail("")
  //   setUserPassword("")
  // }

  // // when login details are changed E.g. input of email or password
  // const handleLogin = (event: ChangeEvent<HTMLInputElement>) => {
  //   let email: string = ''
  //   let password: string = ''

  //   if (event.target.type === "email") {
  //     email = event.target.value
  //     setUserEmail(email)
  //   }
  //   if (event.target.type === "password") {
  //     password = event.target.value;
  //     setUserPassword(password)
  //   }
  // }

  // const handleSignup = (event: ChangeEvent<HTMLInputElement>) => {

  //   let name: string = '';
  //   let email: string = '';
  //   let password: string = '';

  //   if (event.target.type === "text") {
  //     name = event.target.value;
  //     setUserName(name)
  //   }

  //   if (event.target.type === "email") {
  //     email = event.target.value;
  //     setNewUserEmail(email)
  //   }
  //   if (event.target.type === "password") {
  //     password = event.target.value;
  //     setNewUserPassword(password)
  //   }
  // }

  // const handleSignupSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
    
  //   axios.post('http://localhost:8080/users', { name: userName, email: newUserEmail, password: newUserPassword })
  //     .then(response => {
  //       console.log(response.data)
  //       console.log(response.status)

  //       // change how this is handled, 201 may be different?!
  //       if (response.status === 201) {
  //         localStorage.setItem('token', response.data.token)
  //         setIsLoggedIn(true)
  //         navigate('/dashboard'); // redirecting to dashboard
  //       } else {
  //         console.log(response.status)
  //         setIsLoggedIn(false)
  //       }
  //     }).catch(error => console.log(error.name))
  // }

  return (
    <>
      {/* <Login
        onInputChange={handleLogin}
        onSubmit={handleLoginButtonPress}
      /> */}
      {/* <SignUp
        onSignupChange={handleSignup}
        onSubmit={handleSignupSubmit}
      /> */}
    </>

  );
}