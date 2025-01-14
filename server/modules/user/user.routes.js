import express from 'express'
import userController from './user.controller.js';

const router = express.Router();

router.post('/register', userController.register);




export default router