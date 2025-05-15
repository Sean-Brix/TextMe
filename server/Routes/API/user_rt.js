import express from 'express';
import { get_users } from '../../Controller/user_ctrl.js'

// Route: ( '/api/users' )
const router = express.Router();

router.get('/list', get_users);

export default router;