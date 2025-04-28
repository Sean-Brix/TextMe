import account from '../Model/Account_Model/Account_index.js'

export async function getFriendList(){

    
    
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
        })
    }
    catch(e){
        console.log("addFriend Function Error:" + e);
        res.status(500).json({
            message: "Failed to update the user friend list",
            error: e
        })
    }

}

export async function checkFriend(req, res, next){

    try{
        // Retrieve user document
        const user = await account.findById(req.session.userId);
        const check = req.params.id;

        // Checks if the user has this friend id
        const status = user.friend_list.includes(check);

        // A Friend
        if(status){
            return res.status(200).json({
                message: 'The user and the account id is a friend',
                friend: true
            })
        }

        // Not a friend
        res.status(200).json({
            message: 'The user and the account id is not a friend',
            friend: false
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