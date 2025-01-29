import notificationDal from "./notification.dal.js";

class NotificationController {
  addNotification = async (req, res) => {
    try {
      const { user_id, type, sender_user_id, project_id } = req.body;

      let senderName = "";
      let projectName = "";

      if (sender_user_id) {
        const sender = await userDal.getUserById(sender_user_id);
        senderName = sender ? `${sender.user_name} ${sender.user_lastname}` : "Someone";
      }
      if (project_id) {
        const project = await projectDal.oneProject(project_id);
        projectName = project ? project.project_title : "a project";
      }

      let content = "";
      switch (type) {
        case 1:
          content = `You have a new message from ${senderName}`;
          break;
        case 2:
          content = `${senderName} invited you to join ${projectName}`;
          break;
        case 3:
          content = `${senderName} accepted your invitation to ${projectName}`;
          break;
        case 4:
          content = `${senderName} rejected your invitation to ${projectName}`;
          break;
        case 5:
          content = `You have been removed from ${projectName} by ${senderName}`;
          break;
        case 6:
          content = `${senderName} left the project ${projectName}`;
          break;
        default:
          content = `New notification from ${senderName}`;
      }

      const values = [user_id, type, content, 0]; 
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
