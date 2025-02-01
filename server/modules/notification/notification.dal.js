import { executeQuery } from "../../config/db.js";

class NotificationDal {
  addNotification = async (values) => {
    try {
      const sql =
        "INSERT INTO notification (user_id, type,  content, is_read, created_at) VALUES (?, ?, ?, ?, NOW())";
      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  };

  getUserNotifications = async (userId) => {
    try {
      const sql = `
        SELECT n.* 
        FROM notification n
        WHERE n.user_id = ? AND n.is_read = 0
        ORDER BY n.created_at DESC
      `;
      const result = await executeQuery(sql, [userId]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  markAsRead = async (notificationId) => {
    try {
      const sql = "UPDATE notification SET is_read = 1 WHERE notification_id = ?";
      const result = await executeQuery(sql, [notificationId]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  markAllNotificationsAsRead = async (userId, type = null) => {
    try {
      let sql = "UPDATE notification SET is_read = 1 WHERE user_id = ?";
      const params = [userId];

      if (type !== null) {
        sql += " AND type = ?";
        params.push(type);
      }

      return await executeQuery(sql, params);
    } catch (error) {
      throw error;
    }
  };
}

export default new NotificationDal();
