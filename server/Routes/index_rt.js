import express from 'express';

const router = express.Router();

import auth_rt from './Authentication_rt.js'
router.use('/auth', auth_rt);

import api_rt from './API/api_rt.js'
router.use('/api', api_rt);

export default router;
