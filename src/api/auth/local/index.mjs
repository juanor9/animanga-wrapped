import { Router } from 'express';
import handleLogin from './local.controller.mjs';

const router = Router();

// Login
// auth/local/login
router.post('/login', handleLogin);

export default router;
