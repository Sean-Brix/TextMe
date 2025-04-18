import { useEffect, useRef, useState } from "react"

export default function Login(){

    const username = useRef();
    const password = useRef();
    const [account, setAccount]= useState({username: "", password: ""});

    const submitForm = async (e)=>{
        e.preventDefault();

        setAccount({password: password.current.value, username: username.current.value});

        // Request Authentication

        const validate = true;
        if(validate){
            // Route
        }

        // Reset Inputs
        username.current.value = ""
        password.current.value = ""
    }

    return (
        <div>

            <form onSubmit={submitForm}>

                <input type="text" placeholder = "Username" ref={username}/>
                <input type="text" placeholder = "Password" ref={password}/>

                <button type="submit">Login</button>

            </form>

        </div>
    )

}