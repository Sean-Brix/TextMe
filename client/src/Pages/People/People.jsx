import React, { useEffect } from 'react'
import style from './People.module.css'
import { useState, useRef } from 'react'
import Profile from './Sub/Profile'

// ICON
import default_profile from '../../assets/userProfile.png'

export default function People() {

    const [List, setList] = useState([]);
    const [selected, setSelected] = useState({});
    const prev_Selected = useRef(null);

    useEffect(()=>{

        // Fetch the list
        (async()=>{
            const response = await fetch(
                '/api/friends/list/10',
                {
                    method: 'GET',
                    credentials: 'include'
                }
            );
            const data = await response.json();

            // for rendering friend list
            setList(data.friendList);

            setSelected({
                user: data.friendList[0],
                target: prev_Selected.current
            });
        })()

    }, [])

    // USER SELECTION
    const messageSelect = (event, user)=>{
        event.preventDefault();

        // Exchange styles on click
        prev_Selected.current.className = style.user_container;
        event.currentTarget.className = style.selected_user;

        // Save previous selected user
        prev_Selected.current = event.currentTarget;
        setSelected({
            user: user, 
            target: event.target
        });
    }

  return (

    <div className={style.container}>
        
        <div className={style.list_container}>
            {
                List.map((user, index)=>{
                    return(
                        <div 
                            onClick={e=>{messageSelect(e, user)}} 
                            key={`container:${index}`} 
                            ref={index===0? prev_Selected:null}
                            className={style.user_container} 
                        >

                        <img src={default_profile} alt="" className={style.default_profile}/>
                        <div>
                            <h1 className={style.user_name}> {user.username} </h1>
                            <p className={style.user_email}> {user.email} </p>
                        </div>

                    </div>
                    )
                })
                    
            }
        </div>
        
        { selected.target && <Profile {...selected.user} /> }

    </div>

  )
}
