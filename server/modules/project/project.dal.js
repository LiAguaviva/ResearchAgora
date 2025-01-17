import { dbPool, executeQuery } from "../../config/db.js";

class ProjectDal {
  registerProject = async (values, skill_name) => {
    const connection = await dbPool.getConnection();
    try {
      await connection.beginTransaction();
      let sql = `INSERT INTO project(project_title, project_city, project_country, project_description, project_type, project_status, project_max_member, creator_user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      
      values[4] = Number(values[4]); //delete once front is running
      values[5] = Number(values[5]); 
      values[6] = Number(values[6]);

      const [projectResult] = await connection.execute(sql, values);
      const projectId = projectResult.insertId;

      const result = await executeQuery(sql, values);

      let sql2 = 'SELECT skill_id FROM skill WHERE skill_name = ?';
      const skillResult = await executeQuery(sql2, [skill_name]);

      let sql3 = 'INSERT INTO project_skill (project_id, skill_id) VALUES (?, ?)'
      await executeQuery(sql3, [projectId, skill_id]);
      
      return result;
  
    } catch (error) {
      throw error;
    }
  };

  allProjects = async (values) => {
    try {
      let sql = "SELECT * FROM project";
      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  };

  oneProject = async (project_id) => {
    //bring a skill show offers
    try {
      let sql = "SELECT * FROM project WHERE project_id = ?";
      const result = await executeQuery(sql, [project_id]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  editProject = async (values) => {
    let sql =
      "UPDATE project SET project_title = ?, project_city = ?, project_country = ?, project_description = ?, project_type = ?, project_status = ?, project_outcome = ?, project_link = ?, project_max_member = ? WHERE project_id = ?";
    values[4] = Number(values[4]); //delete once front is running
    values[5] = Number(values[5]); //delete once front is running
    values[9] = Number(values[9]); //delete once front is running
    try {
      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  };

  editSkill = async (project_id, finalArrayData) => {
    const connection = await dbPool.getConnection();
    try {
      await connection.beginTransaction();
      let sql = "INSERT INTO skill (skill_name, skill_id) VALUES (?, ?)";
      let finalId = 1;
      for (const elem of finalArrayData) {
        if (elem != "") {
          let sqlId = "SELECT max(skill_id) AS id FROM skill";
          try {
            let [result] = await connection.execute(sqlId);
            console.log(result);
            if (result[0].id != null) {
              finalId = result[0].id + 1;
            }
            await connection.execute(sql, [elem, finalId]);
          } catch (error) {
            if (error.errno != 1062) {
              throw error;
            }
          }
        }
      }
      let dataString = finalArrayData.join();
      let sql2 = "SELECT skill_id FROM skill WHERE find_in_set(skill_name, ?)";
      let [result] = await connection.execute(sql2, [dataString]);
      console.log(result);
      let sql3 = "DELETE FROM project_skill WHERE project_id = ?";
      await connection.execute(sql3, [project_id]);
      let sql4 =
        "INSERT INTO project_skill (project_id, skill_id) VALUES (?, ?)";
      for (const elem of result) {
        await connection.execute(sql4, [project_id, elem.skill_id]);
      }
      await connection.commit();
      return "ok";
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  };



   deleteproject = async(project_id) => {
    const connection = await dbPool.getConnection();
    try{
      await connection.beginTransaction();
      let sqlProject = 'UPDATE project SET project_is_disabled = 1 WHERE project_id = ?'
      await connection.execute(sqlProject, [project_id]);
      
      let sqlSkill = 'UPDATE project_skill SET project_skill_is_disabled = 1 WHERE project_id = ?'
      await connection.execute(sqlSkill, [project_id]);
      
       let sqlOffer = 'UPDATE offer SET is_deleted = 1 WHERE project_id = ?'  //change by disabled
       await connection.execute(sqlOffer, [project_id]);
      
       let sqlUser = 'UPDATE user_project SET status = 3 WHERE project_id = ?'
       await connection.execute(sqlUser, [project_id]);

      //  let sqlOfferSkill = 'UPDATE offer_skill SET offer_skill_is_disabled = 1 WHERE project_id = ?'
      // await connection.execute(sqlOfferSkill, [project_id]);  //there's not project id in offer_skill table

      await connection.commit();   
    }catch (error){
      console.log("EERROR", error);
      await connection.rollback();
      throw error;
    }finally{
      connection.release();
    }
   }







}

export default new ProjectDal();























// registerProject = async (values, skill_name) => {
//   const connection = await dbPool.getConnection();
//   try {
//     let sql = `INSERT INTO project(project_title, project_city, project_country, project_description, project_type, project_status, project_max_member, creator_user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    
//     values[4] = Number(values[4]); //delete once front is running
//     values[5] = Number(values[5]); 
//     values[6] = Number(values[6]);
//     const result = await executeQuery(sql, values);

//     let sql2 = 'SELECT skill_id FROM skill WHERE skill_name = ?';
//     const skillResult = await executeQuery(sql2, [skill_name]);

//     let sql3 = 'INSERT INTO project_skill (project_id, skill_id) VALUES (?, ?)'
//     await executeQuery(sql3, [projectId, skill_id]);
    
   
    

//     return result;
    
    
//   } catch (error) {
//     throw error;
//   }
//};