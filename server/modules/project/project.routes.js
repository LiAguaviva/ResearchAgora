import express from 'express';
import  projectController  from './project.controller.js';
import { tokenVerify } from '../../middleware/verifyToken.js';

const router = express.Router()
router.post('/addproject/:creator_user_id', projectController.addproject)
 


export default router;