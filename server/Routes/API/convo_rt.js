import express from 'express'
import { getConvo, getList } from '../../Controller/conversation_ctrl.js'
import { verifyToken } from '../../Controller/authentication_ctrl.js'

// Route ( '/api/convo' )
const router = express.Router();

// TODO: Get current selected convo
router.get('/ref', verifyToken, getConvo);

// TODO: Get All Convo List
router.get('/list', verifyToken, getList);



export default router;