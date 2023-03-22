import { ChangeEvent, FormEvent, useState } from "react";
import axios from 'axios';
import SignUp from "./SignUp";
import { useNavigate } from 'react-router-dom';

const SignupSmart = () => {
    const [userName, setUserName] = useState('')
    const [newUserEmail, setNewUserEmail] = useState('')
    const [newUserPassword, setNewUserPassword] = useState('')

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleSignup = (event: ChangeEvent<HTMLInputElement>) => {

        let name: string = '';
        let email: string = '';
        let password: string = '';

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
                console.log(response.data)
                console.log(response.status)

                // change how this is handled, 201 may be different?!
                if (response.status === 201) {
                    localStorage.setItem('token', response.data.token)
                    setIsLoggedIn(true)
                    navigate('/dashboard'); // redirecting to dashboard
                } else {
                    console.log(response.status)
                    setIsLoggedIn(false)
                }
            }).catch(error => console.log(error.name))
    }

    return (
        <SignUp
            onSignupChange={handleSignup}
            onSubmit={handleSignupSubmit}
        />
    )
}


export default SignupSmart;
