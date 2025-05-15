import express from 'express';

// Route: ('/api')
const router = express.Router();

import friends_rt from './friends_rt.js'
router.use('/friends', friends_rt);

import user_rt from './user_rt.js'
router.use('/users', user_rt);

import convo_rt from './convo_rt.js'
router.use('/convo', convo_rt);


export default router;
