import express from 'express';
import  projectController  from './project.controller.js';
import { tokenVerify } from '../../middleware/verifyToken.js';

const router = express.Router()
router.get('/allprojects', projectController.allprojects)
router.post('/oneresearcherprojects', projectController.oneresearcherprojects)
router.post('/oneUserAvailableProjects', projectController.oneUserAvailableProjects)
router.post('/addproject/:creator_user_id', tokenVerify, projectController.addproject)
router.post('/oneuserprojects', tokenVerify, projectController.oneuserprojects)
router.get('/oneproject/:project_id', projectController.oneproject)
router.put('/editproject', tokenVerify, projectController.editproject)
router.put('/deleteproject/:project_id', tokenVerify, projectController.deleteproject)
router.post('/findprojectbyskills', projectController.findProjectBySkills)
router.put('/leaveProject', projectController.leaveProject)
router.post('/allrequests', tokenVerify, projectController.allrequests)
router.post('/deleteMember', tokenVerify, projectController.deleteMember)





export default router;