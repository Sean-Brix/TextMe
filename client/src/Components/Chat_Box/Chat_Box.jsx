import React from 'react'
import style from './Chat_Box.module.css'
import { Link } from 'react-router-dom'

// ICON LINKS
import send_icon from '../../assets/send.png'
import add_folder_icon from '../../assets/add_folder.png'
import image_icon from '../../assets/image.png'
import default_profile from '../../assets/userProfile.png'
import audioCall_icon from '../../assets/phoneCall.png'
import videoCall_icon from '../../assets/videoCall.png'
import setting_icon from '../../assets/setting.png'

export default function Chat_Box() {
  return (
    <div className={style.container}>
        <header className={style.header}>

          <div className={style.message_profile}>

            <img src={default_profile} alt="Embed File" className={style.default_profile}/>

            <div className={style.profile_details}>
              <Link to="/" className={style.profile_name}> Ethel Joy </Link>
              <p>Active now </p>
              <div></div>
            </div>

          </div>

          <div className={style.stream_icons}>
            <img src={audioCall_icon} alt="Call" className={style.audioCall_icon}/>
            <img src={videoCall_icon} alt="Video" className={style.videoCall_icon}/>
            <img src={setting_icon} alt="Video" className={style.setting_icon}/>
          </div>

        </header>

        <main className={style.chat_box}>

        </main>

        <div className={style.input_div}>

            <img src={add_folder_icon} alt="Embed File" className={style.add_folder_icon}/>
            <img src={image_icon} alt="Add Image" className={style.image_icon}/>

            <input type="text" placeholder='Aa' className={style.user_input}/>
            <img src={send_icon} alt="Send" className={style.send_icon}/>
        </div>
    </div>
  )
}
