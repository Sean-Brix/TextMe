import React from 'react'
import style from './Message.module.css'
import default_profile from '../../assets/userProfile.png'

export default function ({sender, message}) {
  return (
    <div className={sender.name == 'current'? style.container_current:style.container_other}>

        <img src={default_profile} alt="" className={style.default_profile}/>
        
        <div className={style.message_background}>
            <h2>{message}</h2>
        </div>

    </div>
  )
}
