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

export async function getList(req, res, next){

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;
        const skip = (page - 1) * limit;
        const user = await account.findById(req.user.ID);

        // Populate the current user friend_list
        const conversation = (await user.populate({
            path: 'conversation',
            select: 'metadata participants _id',
            options: {
                limit: limit,
                skip: skip
            }
        })).conversation


        res.status(200).json({convo: conversation});

    } 
    catch (error) {

        console.error('Error fetching Conversation list:', error);
        res.status(500).json({
            message: 'getList(): Failed to fetch existing conversation List',
            error: error.message
        });

    }
}
