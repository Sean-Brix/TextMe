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