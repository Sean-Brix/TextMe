import account from '../Model/Account_Model/Account_index.js'
import mongoose from 'mongoose'

export async function req_Exist(userID, reqID){

    // Get the request id
    const existingAccount = await account.findById(userID);

    if (!existingAccount) {
        throw new Error('Requested account not found');
    }

    // Check if already friends
    if (existingAccount.friend_list.includes(reqID)) {
        return true;
    }

    // Check if already sent request
    if (existingAccount.pending_request.includes(reqID)) {
        return true
    }
    
    // No request yet
    return false;
}

export async function getAccountList(req, res, next){
    try {
        const limit = req.params.id;

        // Get accounts with specified limit, excluding sensitive info
        const accounts = await account.find({}, {
            password: 0,
        }).limit(limit);

        res.status(200).json({friendList: accounts});

    } catch (error) {
        console.error('Error fetching account list:', error);
        throw error;
    }
}

export async function friendRequest(req, res, next){

    // To pass in query as a whole
    const db_session = await mongoose.startSession()
    db_session.startTransaction();

    try{
        const user = req.session.userId;
        const reqAcc = req.params.id;

        if(await req_Exist(user, reqAcc)){
            await db_session.abortTransaction();
            return res.status(409).json({
                message: 'Request Cannot be duplicated',
            })
        }

        const request_status = await account.findByIdAndUpdate(
            reqAcc, 
            {$push: {friend_request: user}},
            {new: true, session: db_session}
        );

        const save_pending = await account.findByIdAndUpdate(
            user,
            {$push: {pending_request: reqAcc}},
            {new: true, session: db_session}
        );

        if(!request_status || !save_pending){
            throw new Error("Failed to send a Friend Request");
        };

        await db_session.commitTransaction();

        // Friend State: 'True', 'False', 'Pending'
        res.status(201).json({
            message: 'Friend Request Successfully Sent',
            request: 'pending'
        })

    }

    catch(e){
        await db_session.abortTransaction();

        console.log("friendRequest function Error: " + e);
        res.status(500).json({
            message: "Failed friend request",
            request: 'false',
            error: e
        })
    }
    finally{
        db_session.endSession();
    }
}

export async function addFriend(req, res, next){

    try{

        const user = req.session.userId;
        const add = req.body.id;

        const update = await account.findByIdAndUpdate(
            user,
            { $push: { friend_list: add } }, 
            { new: true }
        );

        if(!update){
            throw new Error("Failed to update the friend list")
        }

        res.status(201).json({
            message: 'Friend Successfully Added to the accounts list',
            added: true
        })
    }
    catch(e){
        console.log("addFriend Function Error:" + e);
        res.status(500).json({
            message: "Failed to update the user friend list",
            added: false,
            error: e
        })
    }

}

export async function checkFriend(req, res, next){

    try{
        // Retrieve user document
        const user = await account.findById(req.session.userId);
        const check = req.params.id;

        // Checks if the user has connection with this id
        const isFriend = user.friend_list.includes(check);
        const isPending = user.pending_request.includes(check);
        const isRequesting = user.friend_request.includes(check);

        // A Friend
        if(isFriend){
            return res.status(200).json({
                message: 'The user and the account id is a friend',
                request: 'true'
            })
        }

        // User Requested
        if(isPending){
            return res.status(200).json({
                message: 'The user and the account id is a friend',
                request: 'pending'
            })    
        }
        
        // Got a Request
        if(isRequesting){
            return res.status(200).json({
                message: 'The user and the account id is a friend',
                request: 'requesting'
            })    
        }
        
        // Not a friend
        res.status(200).json({
            message: 'The user and the account id is not a friend',
            request: 'false'
        })
    }
    catch(e){
        console.log("checkFriend Error: " + e);
        res.status(500).json({
            message: 'Encountered Error when checking friend status',
            error: e
        });
    }

}

export async function unfriend(req, res, next){

    try{

        const user = req.session.userId;
        const remove = req.body.id;

        const update = await account.findByIdAndUpdate(
            user,
            { $pull: { friend_list: remove } }, 
            { new: true }
        );

        if(!update){
            throw new Error("Failed to update the friend list")
        }

        res.status(201).json({
            message: 'Friend Successfully removed to the accounts list',
        })
    }
    catch(e){
        console.log("unfriend Function Error:" + e);
        res.status(500).json({
            message: "Failed to update the user friend list",
            error: e
        })
    }

}