import express from "express";
import notificationController from "./notification.controller.js";
import { tokenVerify } from '../../middleware/verifyToken.js';

const router = express.Router();

router.post("/addNotification", tokenVerify, notificationController.addNotification);
router.get("/userNotifications/:userId", tokenVerify, notificationController.getUserNotifications);
router.put("/markAsRead/:id", tokenVerify, notificationController.markAsRead);
router.put("/markMessageNotificationsAsRead", tokenVerify, notificationController.markMessageNotificationsAsRead);

export default router;
