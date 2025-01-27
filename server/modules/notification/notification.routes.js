import express from "express";
import notificationController from "./notification.controller.js";

const router = express.Router();


router.post("/addNotification", notificationController.addNotification);
router.get("/userNotifications/:userId", notificationController.getUserNotifications);
router.put("/markAsRead/:id", notificationController.markAsRead);
router.put("/markMessageNotificationsAsRead", notificationController.markMessageNotificationsAsRead);

export default router;
