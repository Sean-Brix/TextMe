import React, { useEffect, useState, useRef } from 'react';
import search_icon from '../../assets/search.png'
import style from './ChatList.module.css';
import Chat_Box from '../../Components/Chat_Box/Chat_Box';
import default_profile from '../../assets/userProfile.png'

export default function ChatList({ friends }) {

    const [selected, setSelected] = useState({});
    const prev_selected = useRef(null);

    useEffect(()=>{
        setSelected({
            user: friends[0],
            target: prev_selected.current
        });

        if(selected.target){
            selected.target.className = style.selected_friend;
        }

    }, [friends])

    const messageSelect = (event, user)=>{
        event.preventDefault();

        // Replace Styles
        prev_selected.current.className = style.friend_container;
        event.currentTarget.className = style.selected_friend;

        // Change Values and rerender
        prev_selected.current = event.currentTarget;
        setSelected({
            user: user, 
            target: event.target
        });
    }

    return (
        <>
            <main className={style.container}>

                <div className={style.header}>
                    <h1>Messages</h1>
                    <div className={style.search_container}>
                        <img src={search_icon} alt="search" className={style.search_icon}/>
                        <input type="text" placeholder="Search Messages" className={style.search_messages}/>
                    </div>
                </div>
                
                {friends.map((friend, index) => {
                    return (
                        <div onClick={e=>{messageSelect(e, friend)}} key={`container:${index}`} className={style.friend_container} ref={index===0? prev_selected:null}>
                            <img src={default_profile} alt="" className={style.default_profile}/>
                            <div>
                                <h1 className={style.friend_name}> {friend.username} </h1>
                                <p className={style.friend_email}> {friend.email} </p>
                            </div>
                        </div>
                    );
                })}

            </main>
            
            { selected.user && <Chat_Box user={{ name: selected.user.username}} /> }



            
        </>
    );
}
