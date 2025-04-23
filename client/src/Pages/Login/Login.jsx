import { useEffect, useRef, useState } from 'react';
import style from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();

        const authenticate_account = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };

        // Request Authentication
        const response = await fetch('http://127.0.0.1:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(authenticate_account),
        });

        const data = await response.json();
        if(response.ok){
            navigate('/Chat');
        }

        // Reset Inputs
        usernameRef.current.value = '';
        passwordRef.current.value = '';
    };

    return (
        <div className={style.container}>
            <form onSubmit={submitForm} className={style.loginForm}>
                
                <div className={style.inputDiv}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        ref={usernameRef}
                    />
                </div>

                <div className={style.inputDiv}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        id="password"
                        placeholder="Password"
                        ref={passwordRef}
                    />
                </div>

                <button type="submit" className={style.signIn_button}>Login</button>
                <Link to="/register">Register an Account</Link>

            </form>
        </div>
    );
}
