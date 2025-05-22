import { io } from 'socket.io-client'

// Connection Instance
const socket = io({
    withCredentials: true,
    autoConnect : false
});

export default socket;