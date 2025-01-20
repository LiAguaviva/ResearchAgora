import express from 'express'
import messageController from './message.controller.js';

const router = express.Router();
router.post('/sendmessage', messageController.sendMessage)
router.delete('/deletemessage', messageController.deleteMessage)

export default router