import { executeQuery } from "../../config/db.js";

class UserDal {

   
  
 
  register = async (values) =>{
    try {
        let sql = "INSERT INTO user (user_email, user_password) VALUES (?, ?)"
        const result = await executeQuery(sql, values);           
    } catch (error) {
        console.log("-------------------", error);
        throw error;
    }
}


}

export default new UserDal();