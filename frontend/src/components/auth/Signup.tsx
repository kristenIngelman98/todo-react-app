import { ChangeEvent, FormEvent, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignupUI from './SignupUI';

const Signup = () => {
    const [userName, setUserName] = useState('')
    const [newUserEmail, setNewUserEmail] = useState('')
    const [newUserPassword, setNewUserPassword] = useState('')

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleSignup = (event: ChangeEvent<HTMLInputElement>) => {

        let name: string = '';
        let email: string = '';
        let password: string = '';

        // change to switch statment?!
        if (event.target.type === "text") {
            name = event.target.value;
            setUserName(name)
        }
        if (event.target.type === "email") {
            email = event.target.value;
            setNewUserEmail(email)
        }
        if (event.target.type === "password") {
            password = event.target.value;
            setNewUserPassword(password)
        }
    }

    const handleSignupSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        axios.post('http://localhost:8080/users', { name: userName, email: newUserEmail, password: newUserPassword })
            .then(response => {
                if (response.status === 201) {
                    setIsLoggedIn(true)
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem("authenticated", "true")
                    navigate('/dashboard'); // redirecting to dashboard
                } else {
                    return // is this right? do I even need an else?
                }
            }).catch((error => {
                console.log(error)
                localStorage.setItem('authenticated', 'false')
                setIsLoggedIn(false)
                // setError('Unable to login. Please try again!')
              }))
    }

    return (
        <SignupUI
            onSignupChange={handleSignup}
            onSubmit={handleSignupSubmit}
        />
    )
}


export default Signup;
