import React from 'react';
import style from './ChatList.module.css';

export default function ChatList({ friends }) {

    return <main className={style.container}>

        {
            friends.map((friend, index) => {
                return (
                    <div key={`container:${index}`}>
                        <h1 key={`name:${index}`}> {friend.username} </h1>
                        <h1 key={`email:${index}`}> {friend.email} </h1>
                    </div>
                )
            })
        }

    </main>;
}
