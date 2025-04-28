import express from 'express';
import { getAccountList, friendRequest, checkFriend, unfriend } from '../../Controller/friendList_ctrl.js'

// Route: ('/api/friends')
const router = express.Router();

router.get('/list/:id', getAccountList);

router.post('/request/:id', friendRequest);

router.post('/remove', unfriend);

router.get('/check/:id', checkFriend);

export default router;
