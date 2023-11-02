import { Router } from 'express';
import { isAuthenticated } from '../auth/auth.services.mjs';
import { handleCreateUser, handleGetUser, handleGetUserById } from './user.controller.mjs';

const router = Router();

// POST api/user/   ---Create user ---
router.post('/', handleCreateUser);

// GET api/user/    ---Get user ---
router.get('/', isAuthenticated, handleGetUser);

// GET api/user/:id    ---Get user by id ---
router.get('/:id', isAuthenticated, handleGetUserById);

// //PATCH api/user/ ---Update user ---
// router.patch("/:id", isAuthenticated, handleUpdateUser);

export default router;
