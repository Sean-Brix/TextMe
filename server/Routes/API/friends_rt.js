import express from 'express';
import { getAccountList, friendRequest, checkFriend, unfriend, removeRequest } from '../../Controller/friendList_ctrl.js'

// Route: ('/api/friends')
const router = express.Router();

router.get('/list/:id', getAccountList);

router.post('/request/:id', friendRequest);

router.post('/request/remove/:id', removeRequest);

router.post('/unfriend', unfriend);

router.get('/check/:id', checkFriend);

export default router;
