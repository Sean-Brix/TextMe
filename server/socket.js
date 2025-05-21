import { Server } from 'socket.io'
import server from './server'
import chat_handler from './Sockets/chat_io';
import analytics_handler from './Sockets/analytics_io';

const io = new Server(server);

io.on('connection', socket =>{
    
    /*
        TODO: Create a authentication logic for handshake, separate services in their own socket files
        Sample Handshake

            const { username, id } = socket.handshake.auth;
            const { feature, theme } = socket.handshake.query;

    */
    // TODO: Only one feature per connection
    
    chat_handler(socket);

    analytics_handler(socket);

})

export default io;