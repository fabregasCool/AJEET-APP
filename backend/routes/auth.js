import express from 'express';
import { login, logout, register } from '../controllers/auth.js';

const router = express.Router();

//CREATE A USER
router.post('/register', register);

// //SIGN IN
router.post('/login', login);

// //SIGN OUT
router.get('/logout', logout);

export default router;
