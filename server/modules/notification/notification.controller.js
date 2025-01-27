import notificationDal from "./notification.dal.js";

class NotificationController {
  addNotification = async (req, res) => {
    try {
      const { user_id, type, reference_id, content } = req.body;
      const values = [user_id, type, reference_id, content, 0];
      const result = await notificationDal.addNotification(values);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  getUserNotifications = async (req, res) => {
    try {
      const { userId } = req.params;
      const result = await notificationDal.getUserNotifications(userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  markAsRead = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await notificationDal.markAsRead(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };

  markMessageNotificationsAsRead = async (req, res) => {
    try {
      const { user_id } = req.body;
      await notificationDal.markMessageNotificationsAsRead(user_id);
      res.status(200).json({ message: "Message notifications marked as read" });
    } catch (error) {
      console.error("Error in markMessageNotificationsAsRead:", error);
      res.status(500).json({ error: "Failed to mark message notifications as read" });
    }
  };
}

export default new NotificationController();
