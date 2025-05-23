import React, { useEffect, useState } from 'react';
import style from './Search_List.module.css';

export default function Search_List({ find }) {
    
    /*  
    ?   TICKET: Clickable User & Opening a new Conversation
    
    TODO: Create a functional conversation box ( CHAT BOX TICKET )
    TODO: When user clicked on a query result list, It'll be temporarily added on top of the chat list
    TODO: The clicked user will become a new convo with messages
    TODO: if user sent a message, save the convo to the list otherwise remove it from the list

    */

    const [friendlist, setFriendList] = useState([]);
    const [debouncedFind, setDebouncedFind] = useState(find);

    // Debounce effect: Delay the request for 500ms, if input change it cancels the timeout callback
    useEffect(() => {

        // Setting a function to callback after 500ms
        const handler = setTimeout(() => {
            setDebouncedFind(find);
        }, 300);

        // If 'find' change causing new useEffect, it'll cancel the last callback
        return () => clearTimeout(handler);

    }, [find]);

    // Request the Search List
    useEffect(() => {
        if (!debouncedFind || debouncedFind.trim().length === 0) {
            setFriendList([]);
            return;
        }

        (async () => {

            try {
                const response = await fetch(
                    `/api/friends/search?find=${debouncedFind}`
                );
                const data = await response.json();
                setFriendList(data.result);
            } 
            catch (error) {
                console.error(error);
            }

        })();

    }, [debouncedFind]);


    return (
        <div className={style.search_list}>

            {friendlist.map((item, index) => (

                <div key={index} className={style.friend_container} onClick={()=>search_clicked(item)}>
                    <h2>{item.username.toUpperCase()}</h2>
                    <p>{item._id.toUpperCase()}</p>
                </div>

            ))}

        </div>
    );
    
}


async function search_clicked(item){
    console.log(item._id);

    // TODO: Allow user to clicked on a search list and fetch post to create a new temporary conversation
}