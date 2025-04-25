import React from 'react'
import style from './Chat_Box.module.css'
import send_icon from '../../assets/send.png'
import add_folder_icon from '../../assets/add_folder.png'
import image_icon from '../../assets/image.png'

export default function Chat_Box() {
  return (
    <div className={style.container}>
        <header className={style.header}>

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
