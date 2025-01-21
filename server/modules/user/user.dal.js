import { dbPool, executeQuery } from "../../config/db.js";
import { hashPassword } from "../../utils/hashUtils.js";

class UserDal {
 
  register = async (values) =>{
    try {
        let sql = "INSERT INTO user (user_email, user_password) VALUES (?, ?)"
       const result = await executeQuery(sql, values);   
       return result;        
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

   verifyUser = async (user_id) => {
    try {
      let sql = 'UPDATE user SET user_is_verified = 1 WHERE user_id = ?'
      const result = await executeQuery(sql, [user_id]);
      return result;
    } catch (error) {
      throw error;
    }
   }

   resetPassword = async (user_id, newPassword) => {
    const hashedPassword = await hashPassword(newPassword)
    let sql = 'UPDATE user SET user_password = ? WHERE user_id = ?'
    const result = await executeQuery(sql,[hashedPassword, user_id]);
    console.log("new password", result)
    return result
   }

   editUser = async (values, file) => {
     let sql = 'UPDATE user SET user_name = ?, user_lastname = ?, user_country = ?, user_city = ?, user_description = ? WHERE user_id = ?'
     
     if(file){
      sql = 'UPDATE user SET user_name = ?, user_lastname = ?, user_country = ?, user_city = ?, user_description = ?, user_avatar = ? WHERE user_id = ?'
      values.splice(5,0,file.filename)
     }
     try {
      const result = await executeQuery(sql, values);
        return result;
     } catch (error) {
        throw error;
     }
   }

   saveTags = async (type, name, user_id, id, finalArrayData) => {
    const connection = await dbPool.getConnection();
    try {
     await connection.beginTransaction();
     let sql = `INSERT INTO ${type} (${name}, ${id}) VALUES (?, ?)`
     let finalId = 1;
     for( const elem of finalArrayData){
      if(elem != ''){
        let sqlId = `SELECT max(${id}) AS id FROM ${type}`
        try {
          
          let [result] = await connection.execute(sqlId)
          console.log(result);       
          if(result[0].id != null) {
            finalId = result[0].id+1  
          }   
          await connection.execute(sql, [elem, finalId])
            
        } catch (error) {
          if(error.errno != 1062){      
            throw error
          }
        }
      }
      
     }
     let dataString = finalArrayData.join();
     let sql2 = `SELECT ${id} FROM ${type} WHERE find_in_set(${name}, ?)`
     let [result] = await connection.execute(sql2, [dataString])
     console.log(result);
     let sql3 = `DELETE FROM user_${type} WHERE user_id = ?`
     await connection.execute(sql3, [user_id])
   let sql4 = `INSERT INTO user_${type} (user_id, ${id}) VALUES (?, ?)`
     for (const elem of result) {
       await connection.execute(sql4, [user_id, elem[id]]) 
     } 
     await connection.commit();   
     return 'ok';   
    } catch (error) {
     await connection.rollback()
      throw error;
    } finally {
     connection.release();
    }
  }


  allUsers = async () => {
    try {
      let sql = 'SELECT u.user_id, u.user_name, u.user_lastname, u.user_email, u.user_country, u.user_city, u.user_description, u.user_proficiency, GROUP_CONCAT(DISTINCT s.skill_name) AS skills, GROUP_CONCAT(DISTINCT f.field_name) AS fields FROM user u LEFT JOIN user_skill us ON u.user_id = us.user_id LEFT JOIN skill s ON us.skill_id = s.skill_id LEFT JOIN user_field uf ON u.user_id = uf.user_id LEFT JOIN field f ON uf.field_id = f.field_id WHERE u.user_type = 2 AND u.user_is_disabled = 0 GROUP BY u.user_id, u.user_name, u.user_lastname, u.user_email, u.user_country, u.user_city, u.user_description, u.user_proficiency;'

      const result = await executeQuery(sql)
      return result;
    } catch (error) {
      throw error;
    }
  }






  deleteUser = async(user_id) => {
    const connection = await dbPool.getConnection();
    try{
      await connection.beginTransaction();
      let sqlUser = 'UPDATE user SET user_is_disabled = 1 WHERE user_id = ?'
      await connection.execute(sqlUser, [user_id]);

      let sqlSkill = 'UPDATE user_skill SET user_skill_is_disabled = 1 WHERE user_id = ?'
      await connection.execute(sqlSkill, [user_id]);

      let sqlField = 'UPDATE user_field SET user_field_is_disabled = 1 WHERE user_id = ?'
      await connection.execute(sqlField, [user_id]);

      await connection.commit();   
    }catch (error){
      await connection.rollback();
      throw error;
    }finally{
      connection.release();
    }
  }

  getUserById = async(id) => {
      try {
        let sql = 'SELECT * FROM USER WHERE user_id = ? AND user_is_disabled = 0 AND user_is_verified = 1'
        const result = await executeQuery(sql, [id]);
        return result;
      } catch (error) {
        throw error;
      }
  }

  getskillsfields = async (id) => {
    try {
      let sql = `SELECT us.user_id,
                GROUP_CONCAT(DISTINCT s.skill_name ORDER BY s.skill_name) AS skills,
                GROUP_CONCAT(DISTINCT f.field_name ORDER BY f.field_name) AS fields
                FROM user_skill us
                LEFT JOIN skill s ON us.skill_id = s.skill_id
                LEFT JOIN user_field uf ON us.user_id = uf.user_id
                LEFT JOIN field f ON uf.field_id = f.field_id
                WHERE us.user_id = ? GROUP BY us.user_id;`;
      const res = await executeQuery(sql, [id]);
      return res;
    } catch (error) {
      throw error;
    }
  };


  requestResponse = async (values) => {
    const connection = await dbPool.getConnection();
    const [user_id, project_id, offer_id] = values;

    try {
      await connection.beginTransaction();

      let sql = 'SELECT number_of_position FROM offer WHERE offer_id = ?';
      const [offer] = await connection.execute(sql, [offer_id]);
       
       if (offer.length === 0) {
        throw new Error('Offer not found.');
      }

      let sqlUserProject = 'INSERT INTO user_project(user_id, project_id) VALUES (?, ?)'
      await connection.execute(sqlUserProject, [user_id, project_id])
    
      await connection.commit();

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release()
    }
  }


   updateRequestStatus = async (values, request_status) => {
     const connection = await dbPool.getConnection();
     const [user_id, project_id, offer_id] = values;
       
    try {
      await connection.beginTransaction();

      let sql = 'SELECT number_of_position FROM offer WHERE offer_id = ?';
      const [offer] = await connection.execute(sql, [offer_id]);
       
       if (offer.length === 0) {
        throw new Error('Offer not found.');
      }

      let currentNumberOfPositions = offer[0].number_of_position;
  
      if (currentNumberOfPositions <= 0) {
        throw new Error('No positions available in the offer.');
      }

      let updatedNumberOfPositions = currentNumberOfPositions - 1;

      let sqlOffer = 'UPDATE offer SET number_of_position = ? WHERE offer_id = ?'
      await connection.execute(sqlOffer, [updatedNumberOfPositions, offer_id])

      let sqlUserProject = 'INSERT INTO user_project(user_id, project_id) VALUES (?, ?)'
      await connection.execute(sqlUserProject, [user_id, project_id])

      let sqlRequest = 'UPDATE request SET request_status = ? WHERE offer_id = ? AND user_id = ?'
      await connection.execute(sqlRequest, [request_status, offer_id, user_id])
    
      await connection.commit();

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release()
    }
  }

    
   invite = async (values) => {
     const {sender_id, receiver_id, project_id, offer_id, project_title, offer_title} = values;
     const message_content = `This is an invitation for joining ${project_title} related to this ${offer_title}`
     
     const connection = await dbPool.getConnection();

      try {
        await connection.beginTransaction();
        let sqlInvitation = 'INSERT INTO invitation (sender_id, receiver_id, project_id, offer_id) VALUES (?, ?, ?, ?)'
        await connection.execute(sqlInvitation, [sender_id, receiver_id, project_id, offer_id])

        let sqlMessage = 'INSERT INTO message (sender_id, message_content, receiver_id) VALUES (?, ?, ?)'
        await connection.execute(sqlMessage, [sender_id, message_content, receiver_id]);

         await connection.commit();
      } catch (error) {
        console.log("EERROR", error);
        await connection.rollback();
        throw error;
      }finally {
        connection.release();
      }
   }

    
   invitationResponse = async(values) =>{
    const {invitation_id, invitation_status} = values;
    
      try {
        let sql = 'UPDATE invitation SET invitation_status = ? WHERE invitation_id = ?'
        await executeQuery(sql, [invitation_status, invitation_id])
      } catch (error) {
        throw error;
      }
   }



}






export default new UserDal();