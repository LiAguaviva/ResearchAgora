import { dbPool, executeQuery } from "../../config/db.js";

class NotificationDal {
  addNotification = async (values) => {
    try {
      const sql =
        "INSERT INTO notification (user_id, type, reference_id, content, is_read, created_at) VALUES (?, ?, ?, ?, ?, NOW())";
      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  };

  getUserNotifications = async (userId) => {
    try {
      const sql = `
        SELECT n.*, CONCAT(u.user_name, ' ', u.user_lastname) AS sender_name
        FROM notification n
        LEFT JOIN user u ON n.reference_id = u.user_id
        WHERE n.user_id = ? AND n.is_read = 0
        ORDER BY n.created_at DESC
      `;
      const result = await executeQuery(sql, [userId]); 
      // console.log("notification result:", result); 
      return result;
    } catch (error) {
      // console.error("error fetching notifications:", error); 
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

  markMessageNotificationsAsRead = async (userId) => {
    try {
      const sql = `
        UPDATE notification
        SET is_read = 1 
        WHERE user_id = ? AND type = 1
      `;
      return await executeQuery(sql, [userId]);
    } catch (error) {
      throw error;
    }
  };
}

export default new NotificationDal();
