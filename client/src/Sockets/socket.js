import { io } from 'socket.io-client'

// Connection Instance
const socket = io({
    autoConnect : false
});

export default socket;