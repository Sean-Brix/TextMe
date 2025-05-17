import { useEffect, useRef, useState } from 'react';
import style from './Register.module.css'
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const emailRef = useRef();
    const [response, setResponse] = useState('');

    const submitForm = async (e) => {
        e.preventDefault();

        const register_account = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        // Request Registration
        const response = await fetch('http://127.0.0.1:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(register_account),
        });

        const data = await response.json();

        setResponse(data.message);
       
        if(data.error) console.log(data.error);

        // Reset Inputs
        usernameRef.current.value = '';
        passwordRef.current.value = '';
        emailRef.current.value = '';
    };

    return (
        <div className={style.container}>
            <form onSubmit={submitForm} className={style.registerForm}>
                <div className={style.inputDiv}>
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder="Username" ref={usernameRef} />
                </div>

                <div className={style.inputDiv}>
                    <label htmlFor="username">Email</label>
                    <input type="text" placeholder="Email" ref={emailRef} />
                </div>
                
                <div className={style.inputDiv}>
                    <label htmlFor="username">Password</label>
                    <input type="text" placeholder="Password" ref={passwordRef} />
                </div>

                <button type="submit" className={style.signUp_button}>Sign Up</button>
                <Link to="/">Already have an account?</Link>

                <h1>{response}</h1>
            </form>
        </div>
    );
}
