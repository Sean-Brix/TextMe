import io from '../socket.js'

function chat_handler(socket){

    socket.on('join-room', ()=>{

        console.log("BABAM! All Message Loaded hehe ;> ");

    });

    socket.on('disconnect', ()=>{

        console.log(' Clean up, iniwan kana nya ');

    })
} 

export default chat_handler;