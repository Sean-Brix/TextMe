
function chat_handler(socket, io){

    socket.on("send", (data)=>{

        console.log(data);

    })

}

export default chat_handler;