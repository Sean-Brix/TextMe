import express from 'express';

const router = express.Router();

import friends_rt from './friends_rt.js'
router.use('/friends', friends_rt);

export default router;
