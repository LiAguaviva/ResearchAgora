import { dbPool, executeQuery } from "../../config/db.js";

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


}






export default new UserDal();