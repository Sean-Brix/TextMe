import React, { useEffect, useState, useRef } from 'react';
import Navigation from '../../Components/Navigation/Navigation';
import style from './Chat.module.css';
import ChatList from '../../Components/Chat_List/ChatList';
import authorize_token from '../../Authentication/authorize_token.js';
import { useNavigate } from 'react-router-dom';

export default function Chat() {

    const navigate = useNavigate();

    // Authenticate
    useEffect(() => {

        (async () => {
            const authentication = await authorize_token();
            if (!authentication) {
                navigate('/');
                return;
            }
        })();

        return;

    }, []);

    return (
        <main className={style.container}>
            
            <Navigation />
            <ChatList />

        </main>
    );
}
