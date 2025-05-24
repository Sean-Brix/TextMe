import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import search_icon from '../../assets/search.png'
import style from './ChatList.module.css'
import Chat_Box from '../../Components/Chat_Box/Chat_Box'
import default_profile from '../../assets/userProfile.png'
import Search_List from './sub/Search_List.jsx'
import authorize_token from '../../Authentication/authorize_token.js'
import socket from "../../Sockets/socket.js"

export default function ChatList() {

    /*  
    ?   TICKET: Functional Search Bar for Chat List
    
    *   DONE: Friend Search API / Search Algorithm ( '/api/friends/search?page=# &limit=# &find=# ' )
    *   DONE: Make a UI for displaying multiple users when client input a query on search bar
    *   DONE: Remove all friend on the chat list & Replace it with a Convo List ( CHAT BOX TICKET )
    
        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        TODO: Need to find a way to start/create a convo with friends

        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    */

    /*
    ?   TICKET: Functional Chat Box (Sending/Retrieving of message etc..)

        TODO: Open a global connection to a Socket(TCP) for realtime server connections
        TODO: Open a chat service connection(Local) to a room or create a room
        TODO: Configure handshake to passed in authentication and Metadatas (Feature/Theme etc)
        TODO: Request for all existing messages if there is any.
        TODO: Handle all message retrieval and sending 
    */

    // socket.connect();

    // socket.on("connect", ()=>{
    //     console.log("User Connected to Socket");
    // })

    // socket.emit("send", SampleCount.current);
    // SampleCount.current += 1;

    // return () => {
    //     socket.off("connect", ()=>{
    //         console.log("User Connected to Socket");
    //     });
    //     socket.disconnect();
    // };


    // Search Function
    const [search, setSearch] = useState("");

    // Holds User Render
    const [convo, setConvoList] = useState([]);
    const [selected, setSelected] = useState({});
    const prev_selected = useRef(null);
    const navigate = useNavigate();

    // INITIAL SETUP
    useEffect(()=>{

        // Fetch the list
        (async()=>{
  
            if (!(await authorize_token())) {
                navigate('/');
                return;
            }

            const response = await fetch('/api/convo/list?page=1&limit=10');
            const data = await response.json();

            // for rendering existing convo list ( Conversation ID )
            setConvoList(data.convo);

            // Set initial selected convo room
            setSelected({
                user: data.convo[0], 
            });
        })()

    }, [])
 

    // Allows the user to clicked on a searched friend which will create a new temporary conversation
    const search_clicked = async ( item )=>{
        
        const response = await fetch(`/api/convo/temp?ref=${item._id}`, {
            method: 'POST'
        })
        
        const data = await response.json();

        if(!response.ok){
            console.log(data.message);
            return
        }

        setConvoList((prev) => [data.conversation, ...prev])
        setSelected({user: convo[0]});
        console.log(selected);
        //! Chat Box is not rendering because setselected is not yet set at the time of rendering, meaning "selected" is still seen as undefine 
    }

    
    // USER SELECTION
    const messageSelect = (event, user)=>{
        event.preventDefault();

        // Exchange styles on click
        prev_selected.current.className = style.convo_container;
        event.currentTarget.className = style.selected_convo;

        // Save previous selected user
        prev_selected.current = event.currentTarget;
        setSelected({
            user: user, 
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
                            <Search_List find={search} selects={ search_clicked }/>
                        </div>
                    
                    </div>
                </div>
                
                {!convo.length == 0 && convo.map((convo, index) => {
                    return (
                        <div 
                            onClick={e=>{messageSelect(e, convo)}} 
                            key={`container:${index}`} 
                            ref={index===0? prev_selected:null}
                            className={index===0? style.selected_convo : style.convo_container} 
                        >

                            <img src={default_profile} alt="" className={style.default_profile}/>
                            <div>

                            {/*    !!! Needs to be Changed into a convo property !!!    */}

                                <h1 className={style.convo_name}> {convo.createdAt} </h1>
                                <p className={style.convo_email}> {convo._id} </p>

                            </div>

                        </div>
                    );
                })}

            </main>
            
            { selected.user && <Chat_Box user={{ name: selected.user._id}} /> || <h1>No Existing Conversation</h1>}

        </>
    );
}
