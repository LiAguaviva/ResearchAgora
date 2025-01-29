import express from 'express'
import messageController from './message.controller.js';
import { tokenVerify } from '../../middleware/verifyToken.js';

const router = express.Router();
router.post('/sendmessage', tokenVerify , messageController.sendMessage)
router.delete('/deletemessage', tokenVerify , messageController.deleteMessage)
router.get('/getmessages/:sender_id/:reciever_id', tokenVerify , messageController.getMessages);
router.get('/chatUsers/:user_id', tokenVerify , messageController.getChatUsers);

export default router