import express from 'express'
import userController from './user.controller.js';
import { tokenVerify, tokenVerifyEmail, forgottenPasswordEmail } from '../../middleware/verifyToken.js';
import uploadImage from '../../middleware/multerSingle.js';



const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/verifyAccount/:token', tokenVerifyEmail, userController.verifyAccount)
router.post('/forgottenPassword', userController.forgottenPassword)
router.post('/resetPassword/:token', forgottenPasswordEmail, userController.resetPassword)
router.get('/findUserById', tokenVerify, userController.findUserById)
router.put('/editUser', tokenVerify , uploadImage('useravatar'), userController.editUser)
router.get('/allusers', userController.allUsers)
router.post('/getresearcherbyid', userController.GetResearcherById)
router.put('/deleteUser/:user_id', tokenVerify, userController.deleteUser )
router.post('/getskills&fields', userController.getskillsfields)
router.patch('/requestresponse', tokenVerify, userController.requestResponse)  //response to request to join the project 
router.patch('/updaterequeststatus', tokenVerify, userController.updateRequestStatus)
router.post('/findUsersBySkills', userController.findUsersBySkills)
router.put('/invite', tokenVerify, userController.invite)
router.patch('/invitationresponse', tokenVerify, userController.invitationResponse)
router.post('/allrequests', tokenVerify, userController.allrequests)
router.post('/pendingrequeststatus', tokenVerify, userController.pendingrequeststatus)
router.post('/allinvites', tokenVerify, userController.allinvites)





export default router