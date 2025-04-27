import React, { useEffect, useState, useRef } from 'react';
import Navigation from '../../Components/Navigation/Navigation';
import style from './Chat.module.css';
import ChatList from '../../Components/Chat_List/ChatList';
import SessionCheck from '../../Components/Authentication/SessionCheck';
import { useNavigate } from 'react-router-dom';

export default function Chat() {

    const navigate = useNavigate();

    // Authenticate
    useEffect(() => {

        const fetchData = async () => {
            const authentication = await SessionCheck();
            if (!authentication) {
                navigate('/');
                return;
            }
        };
        fetchData();

        return;

    }, []);

    return (
        <main className={style.container}>
            
            <Navigation />
            <ChatList />

        </main>
    );
}
