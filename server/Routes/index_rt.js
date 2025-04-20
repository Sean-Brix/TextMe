import express from 'express';

const router = express.Router();

import auth_rt from './Authentication_rt.js'
router.use('/auth', auth_rt);

export default router;
