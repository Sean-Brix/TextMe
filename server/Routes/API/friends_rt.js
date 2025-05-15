import express from 'express';
import { getFriendList, friendRequest, checkFriend, unfriend, removeRequest, acceptRequest } from '../../Controller/friendList_ctrl.js'

// Route: ('/api/friends')
const router = express.Router();

// TODO: convert this to getfriendlist
router.get('/list/:limit', getFriendList);

router.post('/request/send/:id', friendRequest);

router.post('/request/remove/:id', removeRequest);

router.post('/request/accept/:id', acceptRequest);

router.post('/unfriend', unfriend);

router.get('/check/:id', checkFriend);

export default router;
