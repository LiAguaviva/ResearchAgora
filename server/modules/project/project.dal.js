import { executeQuery } from "../../config/db.js";

class ProjectDal {

  registerProject = async(values) => {
     try {
       let sql = `INSERT INTO project(project_title, project_city, project_country, project_description, project_max_member, project_type, creator_user_id) VALUES (?, ?, ?, ?, ?, ?, ?)`
       const result = await executeQuery(sql, values);
       return result;

     } catch (error) {
         throw error;
     }
  }


}

export default new ProjectDal();