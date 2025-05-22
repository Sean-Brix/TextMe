import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { parse } from 'cookie'

/*

    TODO: Create a authentication logic for handshake, separate services in their own socket files
    Sample Handshake

    const { username, id } = socket.handshake.auth;
    const { feature, theme } = socket.handshake.query;

    TODO: Only one feature per connection
    chat_handler(socket);
    analytics_handler(socket);

*/

function setup_socket(io){
    
    dotenv.config();

    io.on('connection', socket =>{
        try {
            

            const token = parse(socket.handshake.headers.cookie).token;
            const secret = process.env.SECRET_ACCESS_KEY

            if(!token) {
                socket.disconnect();
                return;
            }
        
            const decoded = jwt.verify(token, secret);
            socket.user = decoded;

            console.log(socket.user);

        } 
        catch (error) {
            socket.disconnect();
            return;

        }
        
    })
    
}
export default setup_socket;