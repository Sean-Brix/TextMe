import account from '../Model/Account_Model/Account_index.js'
import mongoose from 'mongoose'

export async function get_users(req, res, next){

    try {
        const limit = req.query.limit || 10;
        const self = req.query.self === undefined ? true : req.query.self === 'true';
        let accounts = null;

        if(self){
            
            accounts = await account.find({ 
                
                password: 0 
                
            }).limit(limit);

        }
        else{
            
            accounts = await account.find(
                
                { _id: { $ne: req.session.userId } }, 
                { password: 0 }
                
            ).limit(limit);
            
        }

        res.status(200).json({account_list: accounts});

    } catch (error) {
        res.status(500).json({message: "Error get_users function"});
        console.error('Error fetching account list:', error);
        throw error;
    }

}