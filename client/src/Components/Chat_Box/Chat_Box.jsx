import React,{useEffect, useRef} from 'react'
import style from './Chat_Box.module.css'
import { Link } from 'react-router-dom'

// Components
import Message from '../Message/Message.jsx'

// ICON LINKS
import send_icon from '../../assets/send.png'
import add_folder_icon from '../../assets/add_folder.png'
import image_icon from '../../assets/image.png'
import default_profile from '../../assets/userProfile.png'
import audioCall_icon from '../../assets/phoneCall.png'
import videoCall_icon from '../../assets/videoCall.png'
import setting_icon from '../../assets/setting.png'

export default function Chat_Box({user}) {

  const scrollRef = useRef(null);
  const messageRef = useRef('');

  useEffect(()=>{
    
    /*
    ?   TICKET: Functional Chat Box (Sending/Retrieving of message etc..)

        TODO: Open a global connection to a Socket(TCP) for realtime server connections
        TODO: Open a chat service connection(Local) to a room or create a room
        TODO: Configure handshake to passed in authentication and Metadatas (Feature/Theme etc)
        TODO: Request for all existing messages if there is any.
        TODO: Handle all message retrieval and sending 
    */

    // Get the scoll to the bottom
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;

  }, [])


  return (
    <div className={style.container}>
        <header className={style.header}>

          <div className={style.message_profile}>

            <img src={default_profile} alt="Embed File" className={style.default_profile}/>

            <div className={style.profile_details}>
              
              <Link to="/" className={style.profile_name}> {user.name} </Link>
              
              <div className={style.active}> 
                Active now <div>{/* Green Color */}</div>
              </div>
              
            </div>

          </div>

          <div className={style.stream_icons}>
            <img src={audioCall_icon} alt="Call" className={style.audioCall_icon}/>
            <img src={videoCall_icon} alt="Video" className={style.videoCall_icon}/>
            <img src={setting_icon} alt="Video" className={style.setting_icon}/>
          </div>

        </header>

        <main className={style.chat_box} ref={scrollRef}>

          <Message sender={{'name':'current'}} message="This is a sample message from the client"/>
          <Message sender={{'name':'other'}} message="Another message but from other people, i made this elongated to see how text will react on lengthy messages and it looks good so far, it shouldnt be a problem then."/>
          <Message sender={{'name':'current'}} message="Try a little one"/>
          <Message sender={{'name':'current'}} message="Imma try a longer one on this side to make sure both side are good enough to handle big stuff."/>
          <Message sender={{'name':'other'}} message="Why do you care so much"/>
          <Message sender={{'name':'other'}} message="That you even have the time to read these messages"/>
          <Message sender={{'name':'current'}} message="Well im bored, i got nothing else to do so leave me be"/>

        </main>

        <div className={style.input_div}>

            <img src={add_folder_icon} alt="Embed File" className={style.add_folder_icon}/>
            <img src={image_icon} alt="Add Image" className={style.image_icon}/>

            <input type="text" placeholder='Aa' className={style.user_input} ref={messageRef}/>
            <img src={send_icon} alt="Send" className={style.send_icon}/>
        </div>
    </div>
  )
}
