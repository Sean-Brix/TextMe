
function setup_socket(io){

    io.on('connection', socket =>{

        console.log(socket.handshake.headers);
        console.log("hello");
        
        /*
        TODO: Create a authentication logic for handshake, separate services in their own socket files
        Sample Handshake
        
        const { username, id } = socket.handshake.auth;
        const { feature, theme } = socket.handshake.query;
        
        */
       // TODO: Only one feature per connection
       
       // chat_handler(socket);
       
       // analytics_handler(socket);
       
    })
    
}
export default setup_socket;