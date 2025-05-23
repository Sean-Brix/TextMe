import express from 'express'
import { getConvo, getList, addTemporary, deleteTemporary } from '../../Controller/conversation_ctrl.js'

// Route ( '/api/convo' )
const router = express.Router();

// TODO: Get current selected convo
router.get('/ref', getConvo);

// TODO: Get All Convo List
router.get('/list', getList);

// TODO: Create temporary Convo
router.post('/temp', addTemporary);

// TODO: Delete a temporary Convo
router.post('/temp', deleteTemporary);

export default router;