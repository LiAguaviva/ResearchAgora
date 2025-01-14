import { executeQuery } from "../../config/db.js";

class UserDal {
 
  register = async (values) =>{
    try {
        let sql = "INSERT INTO user (user_email, user_password) VALUES (?, ?)"
        await executeQuery(sql, values);           
    } catch (error) {
        console.log("-------------------", error);
        throw error;
    }
  }

   findUserbyEmail = async (email) =>{
    //maybe do it with transaction 
     try {
         let sql = 'SELECT * FROM user WHERE user_email = ? AND user_is_disabled = 0 AND user_is_verified = 1';
         const result = await executeQuery(sql, [email]);
         return result;
     } catch (error) {
        throw error;
     }
   }


}

export default new UserDal();