import React, { useEffect, useState } from 'react';
import Navigation from '../../Components/Navigation/Navigation';
import style from './Chat.module.css';
import ChatList from '../../Components/Chat_List/ChatList';

export default function Chat() {

    const [friends, setFriends] = useState([])

    // Request all friends
    useEffect(() => {

        const fetchData = async () => {

          const response = await fetch('http://127.0.0.1:3000/api/friends/list/10')
          const data = await response.json();
          setFriends(data.friendList);
          
        };

        fetchData();
    }, []);

    return (
        <main className={style.container}>
            <Navigation />
            <ChatList friends={friends} 
            />
        </main>
    );
}
