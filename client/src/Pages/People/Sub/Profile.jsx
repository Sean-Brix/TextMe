import React from 'react';
import style from './Profile.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


/* 
    TODO: Add a section for looking all friend request sent to the current user
    TODO: Add a section to view all your current request
    TODO: Better navigation
*/ 

export default function Profile({ _id, username, email, profilePicture, friend_list, createdAt,}) {

    const [isFriend, setIsFriend] = useState(null);
    const navigate = useNavigate();

    // Session Check
    useEffect(() => {
        //
        (async () => {
            const response = await fetch(`api/friends/check/${_id}`);
            const data = await response.json();

            if (data.error) {
                navigate('/Chat');
                console.log('Error checking friend status: ' + data.message);
                return;
            }

            // Friend State: 'true', 'false', 'pending', 'requesting
            setIsFriend(data.request);
        })();
    }, [_id]);

    const friendRequest = async () => {
        const response = await fetch(`api/friends/request/send/${_id}`, {
            method: 'POST',
        });

        const data = await response.json();

        // Friend State: 'true', 'false', 'pending', 'requesting
        setIsFriend(data.request);
    };

    const unfriend = async () => {
        const response = await fetch('api/friends/unfriend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: _id,
            }),
        });

        const data = await response.json();

        // Failed to remove
        if (data.error) {
            setIsFriend(true);
            return;
        }

        // Successfully removed
        setIsFriend(false);
    };

    const removePending = async () => {
        try{
            const response = await fetch(`api/friends/request/remove/${_id}`, {
                method: 'POST'
            });
            const data = await response.json();

            if(!response.ok){
                console.log(data.message);
                return;
            }

            setIsFriend(data.request);
        }
        catch(e){
            console.log(e);
        }
    };

    const acceptRequest = async () => {
        try{ 
            const response = await fetch(`api/friends/request/accept/${_id}`,{
                method: 'POST'
            })
            const data = await response.json();
            console.log(data);
            if(!response.ok){
                console.log(data.message);
                return;
            }

            setIsFriend(data.request);
        }
        catch(e){
            console.log(e);
        }

    };

    return (
        <div className={style.container}>
            <h1>{username}</h1>
            <h1>{email}</h1>
            <h1>{createdAt}</h1>

            {isFriend == 'pending' ? (
                <button className={style.addFriend_btn} onClick={removePending}>
                    Request Pending
                </button>
            ) : isFriend == 'true' ? (
                <button className={style.addFriend_btn} onClick={unfriend}>
                    Unfriend
                </button>
            ) : isFriend == 'requesting' ? (
                <button className={style.addFriend_btn} onClick={acceptRequest}>
                    Accept Request
                </button>
            ) : (
                <button className={style.addFriend_btn} onClick={friendRequest}>
                    Add Friend
                </button>
            )}
        </div>
    );
}
