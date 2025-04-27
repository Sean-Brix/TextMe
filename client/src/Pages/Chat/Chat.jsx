import React, { useEffect, useState, useRef } from 'react';
import Navigation from '../../Components/Navigation/Navigation';
import style from './Chat.module.css';
import ChatList from '../../Components/Chat_List/ChatList';
import SessionCheck from '../../Components/Authentication/SessionCheck';
import { useNavigate } from 'react-router-dom';

export default function Chat() {

    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();

    // Request all friends
    useEffect(() => {

        const fetchData = async () => {
            const authentication = await SessionCheck();

            if (!authentication) {
                navigate('/');
                return;
            }

            const response = await fetch(
                '/api/friends/list/10',
                {
                    method: 'GET',
                    credentials: 'include'
                }
            );
            const data = await response.json();

            setFriends(data.friendList);
        };

        fetchData();

        return;

    }, []);

    return (
        <main className={style.container}>
            
            <Navigation />

            <ChatList friends={friends} />

        </main>
    );
}
