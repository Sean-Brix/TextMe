import express from 'express';
import { login, register, tokenDestroy, checkAuth} from '../Controller/authentication_ctrl.js'

// Route: ('/auth')
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', tokenDestroy);
router.get('/check', checkAuth);

export default router;

