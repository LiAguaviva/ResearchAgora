import express from 'express'
import userController from './user.controller.js';
import { tokenVerifyEmail } from '../../middleware/verifyToken.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/verifyAccount/:token', tokenVerifyEmail, userController.verifyAccount)


export default router