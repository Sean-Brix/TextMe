import express from 'express'
import { getConvo } from '../../Controller/conversation_ctrl.js'
import { verifyToken } from '../../Controller/authentication_ctrl.js'

// Route ( '/api/convo' )
const router = express.Router();

// TODO: Get all Existing convo 
router.get('/ref', verifyToken, getConvo);




export default router;