import express from 'express';
import { login, register, sessionDestroy, session_check } from '../Controller/authentication_ctrl.js'

// Route: ('/auth')
const router = express.Router();

router.post('/login', login);
router.post('/register', register)
router.get('/logout', sessionDestroy)
router.get('/check', session_check)


export default router;
