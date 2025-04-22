import React, { useEffect } from 'react';
import style from './ChatList.module.css';

export default function ChatList() {

    // Request all friends
    useEffect(()=>{

        const fetchData = async ()=>{
            
        }
        const data = fetchData();

    }, [])

    return <main className={style.container}></main>;
}
