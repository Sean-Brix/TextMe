import account from '../Model/Account_Model/Account_index.js'
import Convo from '../Model/Conversation_Model/Conversation_index.js'

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

        // TODO: Add another time property to the conversatio schema to track the last sent message, in order to give an ordered list based on the current active messages
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

// TODO: Create another function that removes these temporary convo
export async function addTemporary(req, res, next){
    
    const user = req.user.ID;
    const other = req.query.ref;

    if(!other){
        res.status(400).json({
            message: "Bad Request: Did not add an account reference for participants"
        })
    }

    try {
        const temporary = new Convo({
            participants: [user, other]
        });

        await temporary.save();

        res.status(201).json({
            message: "Temporary conversation created",
            conversation: temporary
        });
    } 
    catch (error) {
        res.status(500).json({
            message: "Failed to create temporary conversation",
            error: error.message
        });
    }

}

export async function deleteTemporary(req, res, next){
    
}