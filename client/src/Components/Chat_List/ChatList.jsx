import React from 'react';
import search_icon from '../../assets/search.png'
import style from './ChatList.module.css';

export default function ChatList({ friends }) {
    
    return (
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
                    <div key={`container:${index}`} className={style.friend_container}>
                        <h1 key={`name:${index}`} className={style.friend_name}> {friend.username} </h1>
                        <p key={`email:${index}`} className={style.friend_email}> {friend.email} </p>
                    </div>
                );
            })}

        </main>
    );
}
