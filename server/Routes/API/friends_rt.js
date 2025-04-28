import express from 'express';
import { getAccountList, addFriend, checkFriend, unfriend } from '../../Controller/friendList_ctrl.js'

// Route: ('/api/friends')
const router = express.Router();

router.get('/list/:id', getAccountList);

router.post('/add', addFriend);

router.post('/remove', unfriend);

router.get('/check/:id', checkFriend);

export default router;
