import express from 'express';
import  projectController  from './project.controller.js';
import { tokenVerify } from '../../middleware/verifyToken.js';

const router = express.Router()
// router.post('/addproject/:creator_user_id', projectController.addproject)
router.get('/allprojects', projectController.allprojects)
// router.post('/oneuserprojects', projectController.oneuserprojects)
router.post('/oneresearcherprojects', projectController.oneresearcherprojects)
router.post('/oneUserAvailableProjects', projectController.oneUserAvailableProjects)
router.post('/addproject/:creator_user_id', tokenVerify, projectController.addproject)
router.post('/oneuserprojects', tokenVerify, projectController.oneuserprojects)
//bring a skill show offers
router.get('/oneproject/:project_id', projectController.oneproject)
 //bring a skill show offers
router.put('/editproject', tokenVerify, projectController.editproject)
router.put('/deleteproject/:project_id', tokenVerify, projectController.deleteproject)
router.post('/findprojectbyskills', projectController.findProjectBySkills)
// router.post('/allrequests', projectController.allrequests)
// router.post('/deleteMember', projectController.deleteMember)
router.put('/leaveProject', projectController.leaveProject)
router.post('/allrequests', tokenVerify, projectController.allrequests)
router.post('/deleteMember', tokenVerify, projectController.deleteMember)





export default router;