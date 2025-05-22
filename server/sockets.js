
function setup_socket(io){

    io.on('connection', socket =>{
        
        /*
        TODO: Create a authentication logic for handshake, separate services in their own socket files
        Sample Handshake
        
        const { username, id } = socket.handshake.auth;
        const { feature, theme } = socket.handshake.query;
        
        */
       // TODO: Only one feature per connection
       
       console.log("Well");
       
       // chat_handler(socket);
       
       // analytics_handler(socket);
       
    })
    
}
export default setup_socket;