import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { parse } from 'cookie'
import chat_socket from './Sockets/chat_io.js'

/*

    TODO: Create a authentication logic for handshake, separate services in their own socket files
    Sample Handshake

    const { username, id } = socket.handshake.auth;
    const { feature, theme } = socket.handshake.query;

    

*/

function setup_socket(io){
    
    dotenv.config();

    io.on('connection', socket =>{
        try {
            
            // AUTHENTICATION
            const token = parse(socket.handshake.headers.cookie).token;
            const secret = process.env.SECRET_ACCESS_KEY

            if(!token) {
                socket.disconnect();
                return;
            }
        
            const decoded = jwt.verify(token, secret);
            socket.user = decoded;

            
        //  TODO: Only one feature per connection
        //  chat_handler(socket);
        //  analytics_handler(socket);

            chat_socket(socket, io);
        } 
        catch (error) {
            socket.disconnect();
            return;

        }
        
    })
    
}
export default setup_socket;