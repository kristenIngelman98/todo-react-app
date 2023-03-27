import { ChangeEvent, FormEvent, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignupUI from './SignupUI';

const Signup = () => {
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const handleSignup = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.type === "text") {
            setUser({
                ...user,
                name: event.target.value,
            })
        }
        if (event.target.type === "email") {
            setUser({
                ...user,
                email: event.target.value,
            })
        }
        if (event.target.type === "password") {
            setUser({
                ...user,
                password: event.target.value
            })
        }
    }

    const handleSignupSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // create new user
        axios.post('http://localhost:8080/users', user)
            .then(response => {
                if (response.status === 201) {
                    // setIsLoggedIn(true)
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem("authenticated", "true")
                    navigate('/dashboard'); // redirecting to dashboard
                } else {
                    return // is this right? do I even need an else?
                }
            }).catch((error => {
                localStorage.setItem('authenticated', 'false')
                // setIsLoggedIn(false)
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
