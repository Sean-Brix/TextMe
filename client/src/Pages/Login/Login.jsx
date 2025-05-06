import { useEffect, useRef, useState } from 'react';
import style from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const hasRun = useRef(false);
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();

        if(hasRun.current) return;
        hasRun.current = true;

        const authenticate_account = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };

        // Request Authentication
        const response = await fetch('/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(authenticate_account),
        });

        const data = await response.json();

        console.log(data.message);
        
        if(response.ok){
            return navigate('/Chat');
        }

        hasRun.current = false;

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
