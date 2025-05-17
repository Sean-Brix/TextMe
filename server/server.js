import http from 'http';
import app from './app.js';
import dotenv from 'dotenv';
import colors from 'colors';
import mongoose from 'mongoose';

// Configuration
dotenv.config();
colors.enable();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.MONGO_URI;

// Database
mongoose.connect(DB_URI, {autoIndex: false});

// Server
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(
        '\n\n\n\nLINK: '.cyan + ('http://127.0.0.1:' + PORT + '/\n\n\n').yellow.italic.underline
    );
});

export default server;
