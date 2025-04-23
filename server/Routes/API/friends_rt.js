import express from 'express';
import { getAccountList } from '../../Controller/friendList_ctrl.js'

// Route: ('/api/friends')
const router = express.Router();

router.get('/list/:id', getAccountList)


export default router;
