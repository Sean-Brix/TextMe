import React, { useEffect, useState } from 'react';
import style from './Search_List.module.css';

export default function Search_List({ find }) {
    const [friendlist, setFriendList] = useState([]);
    const [debouncedFind, setDebouncedFind] = useState(find);

    // Debounce effect: update debouncedFind 300ms after user stops typing
    useEffect(() => {

        const handler = setTimeout(() => {
            console.log(find);
            setDebouncedFind(find);
        }, 500);

        return () => clearTimeout(handler); // cleanup if find changes within 300ms

    }, [find]);

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

                <div key={index} className={style.friend_container}>
                    <h1>{item.username}</h1>
                </div>

            ))}

        </div>
    );
}
