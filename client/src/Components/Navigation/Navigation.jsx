import React from 'react'
import style from './Navigation.module.css'
import {useNavigate} from 'react-router-dom'

export default function Navigation() {

  const navigate = useNavigate()

  const logout = async () => {
    try {
      
      const response = await fetch('http://127.0.0.1:3000/auth/logout');
      const data = await response.json();
      
      if (response.ok) {
        navigate('/');
        return;
      } 

      alert(data.message || 'Logout failed');
      
    } 
    catch (error) {
      alert('Error during logout');
    }
  };

  return (

    <div className={style.container}>

        <div className={style.profile}>

        </div>

        <button className={style.logout} onClick={logout}>Logout</button>

    </div>

  )

}
