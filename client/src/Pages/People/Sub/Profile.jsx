import React from 'react'
import style from './Profile.module.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile({_id, username, email, profilePicture, friend_list, createdAt}) {

    const [isFriend, setIsFriend] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{

      (async ()=>{
        const response = await fetch(`api/friends/check/${_id}`);
        const data = await response.json();

        if(data.error){
          navigate('/Chat');
          console.log('Error checking friend status: ' + data.message);
          return;
        }

        setIsFriend(data.friend);

      })();

    }, [_id])
 
    const addFriend = async()=>{
        const response = await fetch('api/friends/add', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: _id
          })
        });

        const data = await response.json();

        if(data.error){
          setIsFriend(false);
          return
        }

        setIsFriend(true);
    }

    const unfriend = async()=>{

        const response = await fetch('api/friends/remove', {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: _id
          })
        });

        const data = await response.json();

        // Failed to remove
        if(data.error){
          setIsFriend(true);
          return
        }

        // Successfully removed
        setIsFriend(false);
    }

  return (
    
    <div className={style.container}>

        <h1>{username}</h1>
        <h1>{email}</h1>
        <h1>{createdAt}</h1>

        {
          isFriend?

          <button className={style.addFriend_btn} onClick={unfriend}>Unfriend</button>
          :
          <button className={style.addFriend_btn} onClick={addFriend}>Add Friend</button>
        }

    </div>
  )
}
