import { ChangeEvent, FormEvent, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignupUI from './SignupUI';
import { Alert } from "reactstrap";

const Signup = () => {
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState('')

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

    const handleSignupSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const responseData = await response.json()
            console.log('Signup was successful: ', responseData)
            // setIsLoggedIn(true)
            localStorage.setItem('token', responseData.token)
            localStorage.setItem("authenticated", "true")
            navigate('/dashboard'); // redirecting to dashboard
        } catch (error) {
            console.error('Error creating post:', error)
            localStorage.setItem('authenticated', 'false')
            // setIsLoggedIn(false)
            setError('Unable to login. Please try again!')
        };

    }

    return (
        <>
        <SignupUI
            onSignupChange={handleSignup}
            onSubmit={handleSignupSubmit}
        />
        {error ? <Alert color="danger">{error}</Alert> : ''}
        </>
    )
}

export default Signup;