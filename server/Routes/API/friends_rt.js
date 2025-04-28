import express from 'express';
import { getAccountList } from '../../Controller/friendList_ctrl.js'

// Route: ('/api/friends')
const router = express.Router();

router.get('/list/:id', getAccountList)

router.get('/add', (req, res)=>{
    const user = req.session.userId;
    const add = req.body.addUser;

    // TODO: Add friend to the account
})


export default router;
