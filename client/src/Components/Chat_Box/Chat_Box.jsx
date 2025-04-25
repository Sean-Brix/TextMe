import React from 'react'
import style from './Chat_Box.module.css'
import send_icon from '../../assets/send.png'

export default function Chat_Box() {
  return (
    <div className={style.container}>
        <header className={style.header}>

        </header>

        <main className={style.chat_box}>

        </main>

        <div className={style.input_div}>

            <img src="" alt="Embed File" />
            <img src="" alt="Add Image" />

            <input type="text" placeholder='Aa' className={style.user_input}/>
            <img src={send_icon} alt="Send" className={style.send_icon}/>
        </div>
    </div>
  )
}
