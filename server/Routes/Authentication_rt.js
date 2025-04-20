import express from 'express';
import { login, register } from '../Controller/authentication_ctrl.js'

// Route: ('/auth')
const router = express.Router();

router.post('/login', login);
router.post('/register', register)


export default router;
