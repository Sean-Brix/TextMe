import account from '../Model/Account_Model/Account_index.js'
import convo from '../Model/Conversation_Model/Conversation_index.js'

export async function getConvo(req, res, next){
    const user = await account.findById(req.user.ID);
    const roomID = req.query.room

    if(!roomID){
        res.status(400).json({
            message: "Bad Request: Room ID Query isnt passed in the request"
        })
    }

    // TODO: Find the conversation ( The conversation should exist first )
}