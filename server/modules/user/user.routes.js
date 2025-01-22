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
router.put('/deleteUser/:user_id', userController.deleteUser )
router.post('/getskills&fields', userController.getskillsfields)
router.patch('/joinresponse', userController.joinResponse)
router.patch('/updaterequeststatus', userController.updateRequestStatus)
router.post('/findUsersBySkills', userController.findUsersBySkills)
router.get('/allUsers', userController.allUsers)
export default router