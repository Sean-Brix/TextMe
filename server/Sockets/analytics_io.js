import io from '../socket.js'

function analytics_handler(socket){
    
    socket.on('open-stats', ()=>{

        console.log('boom! stats is displayed :)');
        
    })

    socket.on('disconnect', ()=>{

        console.log(' Clean up, the user left ');

    })
}

export default analytics_handler;