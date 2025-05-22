import http from 'http';
import app from './app.js';
import dotenv from 'dotenv';
import colors from 'colors';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import setup_socket from './sockets.js';

// Configuration
dotenv.config();
colors.enable();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI;

// Database
mongoose
    .connect(DB_URI, {autoIndex: false})
    .then(() => console.log('MongoDB Connected'.green.bold))
    .catch(err => {
        console.error('MongoDB Connection Error:'.red.bold, err.message);
        process.exit(1);
    });

// Server
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(
        '\n\n\n\nLINK: '.cyan + ('http://127.0.0.1:' + PORT + '/\n').yellow.italic.underline
    );
});


// Websockets
const io = new Server(server);
setup_socket(io);

export default server;
