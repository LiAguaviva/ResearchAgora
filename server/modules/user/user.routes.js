import express from 'express'
import userController from './user.controller.js';
import { tokenVerify, tokenVerifyEmail } from '../../middleware/verifyToken.js';
import uploadImage from '../../middleware/multerSingle.js';

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/verifyAccount/:token', tokenVerifyEmail, userController.verifyAccount)
router.get('/findUserById', tokenVerify, userController.findUserById)
router.put('/editUser', tokenVerify , uploadImage('useravatar'), userController.editUser)
router.put('/deleteUser/:user_id', userController.deleteUser )
router.post('/getskills&fields', userController.getskillsfields)


export default router