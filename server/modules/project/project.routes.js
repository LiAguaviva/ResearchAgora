import express from 'express';
import  projectController  from './project.controller.js';
import { tokenVerify } from '../../middleware/verifyToken.js';

const router = express.Router()
router.post('/addproject/:creator_user_id', projectController.addproject)
router.get('/allprojects', projectController.allprojects)
router.get('/oneproject', projectController.oneproject)
router.put('/editproject', projectController.editproject)
router.get('/findproject', projectController.findproject)
router.put('/deleteproject', projectController.deleteproject)




export default router;