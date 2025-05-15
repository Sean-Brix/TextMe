import React from 'react'
import style from './Navigation.module.css'
import {useNavigate} from 'react-router-dom'

// ICONS
import people_icon from '../../assets/people_icon.png'
import message_icon from '../../assets/message_icon.png'

export default function Navigation() {

  const navigate = useNavigate()

  const logout = async () => {
    try {
      
      const response = await fetch('/auth/logout');
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

      <div className={style.navigation}>

        <img src="#" alt="o" className={style.profile}/>
        <img src={people_icon} alt="People" className={style.people_icon} onClick={()=> navigate('/People')}/>

      </div>

        <img src={message_icon} alt="People" className={style.people_icon} onClick={()=> navigate('/Chat')}/>
        <button className={style.logout} onClick={logout}>Logout</button>

    </div>

  )

}
