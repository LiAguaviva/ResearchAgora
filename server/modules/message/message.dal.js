import { dbPool,executeQuery } from "../../config/db.js";

class MessageDal {
  sendMessage = async(values) => {
    console.log(values);
    try {
      let sql = 'INSERT INTO message (message_content,reciever_id,sender_id) VALUES (?,?,?)'
      const result = await executeQuery(sql,values);
      return result; 
    } catch (error) {
      throw error
    }
    
  }
  deleteMessage = async(values) => {
    console.log(values);
    try {
      let sql = 'DELETE FROM message WHERE message_id = ?'
      const result = await executeQuery(sql,[values]);
      return result; 
    } catch (error) {
      throw error
    }
    
  }
}

export default new MessageDal();