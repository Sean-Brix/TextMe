import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import search_icon from '../../assets/search.png'
import style from './ChatList.module.css'
import Chat_Box from '../../Components/Chat_Box/Chat_Box'
import default_profile from '../../assets/userProfile.png'
import Search_List from './sub/search_list.jsx'
import authorize_token from '../../Authentication/authorize_token.js'

export default function ChatList() {

    /*  
    ?   TICKET: Functional Search Bar for Chat List
    
    *   DONE: Friend Search API / Search Algorithm ( '/api/friends/search?page=# &limit=# &find=# ' )
    *   DONE: Make a UI for displaying multiple users when client input a query on search bar
        TODO: Remove all friend on the chat list & Replace it with a Convo List ( CHAT BOX TICKET )

    */

    // Search Function
    const [search, setSearch] = useState("");

    // Holds User Render
    const [friends, setFriends] = useState([]);
    const [selected, setSelected] = useState({});
    const prev_selected = useRef(null);
    const navigate = useNavigate();

    // INITIAL SETUP
    useEffect(()=>{

        // Fetch the list
        (async()=>{

            const authentication = await authorize_token();
            
            if (!authentication) {
                navigate('/');
                return;
            }

            const response = await fetch('/api/friends/list?page=1&limit=10');
            const data = await response.json();

            // for rendering friend list
            setFriends(data.friendList);

            // Set initial selected user
            setSelected({
                user: data.friendList[0],
                target: prev_selected.current,
            });
        })()

    }, [])


    // USER SELECTION
    const messageSelect = (event, user)=>{
        event.preventDefault();

        // Exchange styles on click
        prev_selected.current.className = style.friend_container;
        event.currentTarget.className = style.selected_friend;

        // Save previous selected user
        prev_selected.current = event.currentTarget;
        setSelected({
            user: user, 
            target: event.target
        });
    }

    return (
        <>

            <main className={style.container}>

                <div className={style.header}>
                    <h1>Messages</h1>
                    <div className={style.search_container}>
                        <img src={search_icon} alt="search" className={style.search_icon}/>
                        <input 
                            type="text" 
                            placeholder="Search Messages" 
                            className={style.search_messages} 
                            onChange={e=>setSearch(e.target.value)} 
                            onBlur={()=>setSearch("")}
                            onFocus={e=>setSearch(e.target.value)}
                        />
                        <div className={style.search_list}>
                            <Search_List find={search}/>
                        </div>
                    
                    </div>
                </div>
                
                {!friends.length == 0 && friends.map((friend, index) => {
                    return (
                        <div 
                            onClick={e=>{messageSelect(e, friend)}} 
                            key={`container:${index}`} 
                            ref={index===0? prev_selected:null}
                            className={index===0? style.selected_friend : style.friend_container} 
                        >

                            <img src={default_profile} alt="" className={style.default_profile}/>
                            <div>
                                <h1 className={style.friend_name}> {friend.username} </h1>
                                <p className={style.friend_email}> {friend.email} </p>
                            </div>

                        </div>
                    );
                })}

            </main>
            
            { selected.user && <Chat_Box user={{ name: selected.user.username}} /> || <h1>Walang friend - HAHAHAHA</h1>}

        </>
    );
}
