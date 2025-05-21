import express from 'express';

// Route ( '/' )
const router = express.Router();

import auth_rt from './Authentication_rt.js'
router.use('/auth', auth_rt);


// API Authentication
import { verifyToken } from '../Controller/authentication_ctrl.js'
router.use(verifyToken);


import api_rt from './API/api_rt.js'
router.use('/api', api_rt);


export default router;

