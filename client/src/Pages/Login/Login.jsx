import { useEffect, useRef, useState } from "react"

export default function Login(){

    const usernameRef = useRef();
    const passwordRef = useRef();
    const [response, setResponse] = useState('');

    const submitForm = async (e)=>{
        e.preventDefault();

        const authenticate_account = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };

        // Request Authentication
        const response = await fetch('http://127.0.0.1:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authenticate_account)
        });

        const data = await response.json();
        setResponse(data.message);

        // Reset Inputs
        usernameRef.current.value = ""
        passwordRef.current.value = ""
    }

    return (
        <div>

            <form onSubmit={submitForm}>

                <input type="text" placeholder = "Username" ref={usernameRef}/>
                <input type="text" placeholder = "Password" ref={passwordRef}/>

                <button type="submit">Login</button>

                <h1>{response}</h1>

            </form>

        </div>
    )

}