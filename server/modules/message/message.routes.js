import express from 'express'
import messageController from './message.controller.js';

const router = express.Router();
router.post('/sendmessage', messageController.sendMessage)
router.delete('/deletemessage', messageController.deleteMessage)
router.get('/getmessages/:sender_id/:reciever_id', messageController.getMessages);
router.get('/chatUsers/:user_id', messageController.getChatUsers);

export default router