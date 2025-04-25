import express from 'express';
import { login, register, sessionDestroy } from '../Controller/authentication_ctrl.js'

// Route: ('/auth')
const router = express.Router();

router.post('/login', login);
router.post('/register', register)
router.get('/logout', sessionDestroy)

export default router;
