import express from 'express';
import  projectController  from './project.controller.js';
import { tokenVerify } from '../../middleware/verifyToken.js';

const router = express.Router()
router.post('/addproject/:creator_user_id', projectController.addproject)
router.get('/allprojects', projectController.allprojects)
router.get('/oneuserprojects', projectController.oneuserprojects)
//bring a skill show offers
router.get('/oneproject/:project_id', projectController.oneproject)
 //bring a skill show offers
router.put('/editproject', projectController.editproject)
router.put('/deleteproject/:project_id', projectController.deleteproject)
router.get('/findprojectbyskills', projectController.findProjectBySkills)
router.post('/joinrequest', projectController.joinRequest)





export default router;