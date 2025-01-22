import messageDal from "./message.dal.js";

class MessageController {
  sendMessage = async(req,res) => {
    try {
      const {message_content,reciever_id,sender_id} = req.body;
      const values = [message_content,reciever_id,sender_id]
      const result = await messageDal.sendMessage(values);
      res.status(200).json(result)
    } catch (error) {
        console.log("eerrrrrrr", error);
        res.status(500).json(error)  
    }
  }
  deleteMessage = async(req,res) => {
    try {
      const {message_id} = req.body;
      console.log("message_id+++++++++",message_id);
      
      const result = await messageDal.deleteMessage(message_id);
      res.status(200).json(result)
    } catch (error) {
        console.log("eerrrrrrr", error);
        res.status(500).json(error)  
    }
  }
}

export default new MessageController();