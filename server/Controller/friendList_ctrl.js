import account from '../Model/Account_Model/Account_index.js'
import mongoose from 'mongoose'

// Check if user requested to the ID
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

    // Check if the reqID sent a request
    if (existingAccount.friend_request.includes(reqID)) {
        return true
    }
    
    // No request yet
    return false;
}


export async function getFriendList(req, res, next){
    try {
        const limit = req.params.limit || 15;
        const user = await account.findById(req.session.userId);

        // Populate the current user friend_list
        const friendList = (await user.populate({
            path: 'friend_list',
            select: '_id username email profilePicture',
            options: {limit: parseInt(limit)}
        })).friend_list


        res.status(200).json({friendList: friendList});
        
    } 
    catch (error) {
        console.error('Error fetching account list:', error);
        throw error;
    }
}

// Sends a request to the user
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

// Remove friend request
export async function removeRequest(req, res, next){

    // To pass in query as a whole
    const db_session = await mongoose.startSession()
    db_session.startTransaction();

    try{
        const user = req.session.userId;
        const reqAcc = req.params.id;

        if(!(await req_Exist(user, reqAcc))){
            await db_session.abortTransaction();
            return res.status(409).json({
                message: 'No current friend request',
            })
        }

        const request_status = await account.findByIdAndUpdate(
            reqAcc, 
            {$pull: {friend_request: user}},
            {new: true, session: db_session}
        );

        const remove_pending = await account.findByIdAndUpdate(
            user,
            {$pull: {pending_request: reqAcc}},
            {new: true, session: db_session}
        );

        if(!request_status || !remove_pending){
            throw new Error("Failed to revoke Friend Request");
        };

        await db_session.commitTransaction();

        // Friend State: 'True', 'False', 'Pending'
        res.status(201).json({
            message: 'Friend Request Successfully Removed',
            request: 'false'
        })

    }

    catch(e){
        await db_session.abortTransaction();

        console.log("friendRequest function Error: " + e);
        res.status(500).json({
            message: "Failed friend request",
            request: 'true',
            error: e
        })
    }
    finally{
        db_session.endSession();
    }
}

// Accept friend request
export async function acceptRequest(req, res, next){
    
    // To pass in query as a whole
    const db_session = await mongoose.startSession()
    db_session.startTransaction();

    try{
        const user = req.session.userId;
        const reqAcc = req.params.id;

        if(!(await req_Exist(user, reqAcc))){
            await db_session.abortTransaction();
            return res.status(409).json({
                message: 'No current friend request',
            })
        }

        const remove_pending = await account.findByIdAndUpdate(
            reqAcc, 
            {$pull: {pending_request: user}},
            {new: true, session: db_session}
        );

        const remove_request = await account.findByIdAndUpdate(
            user,
            {$pull: {friend_request: reqAcc}},
            {new: true, session: db_session}
        );

        const user_add_friend = await account.findByIdAndUpdate(
            user,
            {$push: {friend_list: reqAcc}},
            {new: true, session: db_session}
        );

        const req_add_friend = await account.findByIdAndUpdate(
            reqAcc,
            {$push: {friend_list: user}},
            {new: true, session: db_session}
        );

        if(!remove_pending || !remove_request || !user_add_friend || !req_add_friend){
            throw new Error("Failed to Accept Friend Request");
        };

        await db_session.commitTransaction();

        // Friend State: 'True', 'False', 'Pending'
        res.status(201).json({
            message: 'Friend Request Successfully Accepted',
            request: 'true'
        })

    }

    catch(e){
        await db_session.abortTransaction();

        console.log("friendRequest function Error: " + e);
        res.status(500).json({
            message: "Failed to accept friend request",
            request: 'requesting',
            error: e
        })
    }
    finally{
        db_session.endSession();
    }
}

// Checks the user and ID connection
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

// Unfriend the user
export async function unfriend(req, res, next){

    const db_session = await mongoose.startSession();
    db_session.startTransaction()

    try{

        const user = req.session.userId;
        const reqAcc = req.body.id;


        if(!(await account.findById(req.session.userId)).friend_list.includes(reqAcc)){
            await db_session.abortTransaction();
            res.status(409).json({
                message: "Both users are not friend",
            })
        }

        const update_user = await account.findByIdAndUpdate(
            user,
            { $pull: { friend_list: reqAcc } }, 
            { new: true, session: db_session }
        );

        const update_req = await account.findByIdAndUpdate(
            reqAcc,
            { $pull: { friend_list: user } }, 
            { new: true, session: db_session }
        );

        if(!update_user || !update_req){
            throw new Error("Failed to update the friend list")
        }

        await db_session.commitTransaction();
        res.status(201).json({
            message: 'Friend Successfully removed to the accounts list',
            request: 'false'
        })
    }
    catch(e){
        await db_session.abortTransaction();
        console.log("unfriend Function Error:" + e);
        res.status(500).json({
            message: "Failed to update the user friend list",
            request: 'true',
            error: e
        })
    }

}