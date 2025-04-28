import React from 'react'
import style from './Profile.module.css'
import { useEffect } from 'react';
import SessionCheck from '../../../Components/Authentication/SessionCheck';
import { useNavigate } from 'react-router-dom';

export default function Profile({_id, username, email, profilePicture, friend_list, createdAt}) {

    const navigate = useNavigate();

    useEffect(()=>{
        const fetchData = async () => {
            const authentication = await SessionCheck();
            if (!authentication) {
                navigate('/');
                return;
            }
        };
        fetchData();

        return;
    }, [])

    const addFriend = async()=>{
        const response = await fetch('api/friends/add');
    }

  return (
    <div className={style.container}>

        <h1>{username}</h1>
        <h1>{email}</h1>
        <h1>{createdAt}</h1>

        <button className={style.addFriend_btn}>Add Friend</button>

    </div>
  )
}
