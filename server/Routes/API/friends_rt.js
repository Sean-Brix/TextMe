import express from 'express';
import { getFriendList, friendRequest, checkFriend, unfriend, removeRequest, acceptRequest, searchFriend } from '../../Controller/friendList_ctrl.js'

// Route: ('/api/friends')
const router = express.Router();


router.get('/list', getFriendList);

router.get('/search', searchFriend);

router.post('/request/send/:id', friendRequest);

router.post('/request/remove/:id', removeRequest);

router.post('/request/accept/:id', acceptRequest);

router.post('/unfriend', unfriend);

router.get('/check/:id', checkFriend);

export default router;

