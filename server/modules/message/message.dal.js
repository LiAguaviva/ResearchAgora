import { executeQuery } from "../../config/db.js";

class MessageDal {
  sendMessage = async(values) => {
    try {
      let sql = 'INSERT INTO message (message_content,receiver_id,sender_id) VALUES (?,?,?)'
      const result = await executeQuery(sql,values);
      return result; 
    } catch (error) {
      throw error
    }
    
  }
  deleteMessage = async(values) => {
    try {
      let sql = 'DELETE FROM message WHERE message_id = ?'
      const result = await executeQuery(sql,[values]);
      return result; 
    } catch (error) {
      throw error
    }
    
  }

  getMessages = async(sender_id, reciever_id) => {
    try {
      let sql = `SELECT * FROM message 
                   WHERE (sender_id = ? AND receiver_id = ?) 
                      OR (sender_id = ? AND receiver_id = ?) 
                   ORDER BY message_date_time ASC`;
      const result = await executeQuery(sql, [sender_id, reciever_id, reciever_id, sender_id]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  getChatUsers = async (userId) =>{
    try {
        let sql = `
            SELECT DISTINCT u.user_id, u.user_name,u.user_lastname ,u.user_avatar
            FROM message m
            JOIN user u ON u.user_id = m.receiver_id OR u.user_id = m.sender_id
            WHERE (m.sender_id = ? OR m.receiver_id = ?)
            AND u.user_id != ?;
        `;
        const users = await executeQuery(sql, [userId, userId, userId]);
        return users;
    } catch (error) {
        throw error;
    }
  }

  getSenderDetails = async (senderId) => {
    try {
      const sql = "SELECT user_name, user_lastname FROM user WHERE user_id = ?";
      const result = await executeQuery(sql, [senderId]);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      throw error;
    }
  };
}

export default new MessageDal();