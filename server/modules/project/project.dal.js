import { dbPool, executeQuery } from "../../config/db.js";

class ProjectDal {
  //   registerProject = async (values, skill_name) => {
  //     const connection = await dbPool.getConnection();
  //     try {
  //       await connection.beginTransaction();
  //       let sql = `INSERT INTO project(project_title, project_city, project_country, project_description, project_type, project_status, project_max_member, creator_user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  //       /* console.log("values++++++++++",values);
  //       console.log("skill_name-------",skill_name); */

  //       const [projectResult] = await connection.execute(sql, values);
  //       const projectId = projectResult.insertId;

  //       let finalId = 1;
  //       console.log("skill_name-----------before",skill_name);

  //       if (Array.isArray(skill_name)) {
  //         skill_name = skill_name
  //           .map((skill) => skill.replace(/[\[\]]/g, "").trim()) // Remove brackets and trim
  //           .filter((skill) => skill); // Remove empty strings
  //       } else if (typeof skill_name === "string") {
  //         skill_name = skill_name
  //           .replace(/[\[\]]/g, "") // Remove brackets
  //           .split(",") // Split into array
  //           .map((skill) => skill.trim()) // Trim whitespace
  //           .filter((skill) => skill); // Remove empty strings
  //       } else {
  //         skill_name = []; // Default to an empty array if no valid skills
  //       }

  //         console.log("skill_name-----------after",skill_name);

  //       const skillIds = [];
  //        for(const elem of skill_name){
  //         let sqlId = 'SELECT max(skill_id) AS id FROM skill'
  //         let [maxId] = await connection.execute(sqlId)

  //        /*  console.log("max iddddddddddddd",maxId);
  //         console.log("max id.iddddddddddd",maxId[0].id); */
  //         if(maxId[0].id != null) {
  //           finalId = maxId[0].id+1
  //           /* console.log(" finalId //////////////////",finalId);
  //           console.log(" elemmmmmmmmmmmmmmmmm",elem); */
  //           const sqlSkill = 'INSERT INTO skill (skill_id,skill_name) VALUES (?,?)'
  //           await connection.execute(sqlSkill, [finalId,elem ])
  //           let sqlId2 = 'SELECT skill_id AS id2 FROM skill WHERE skill_name = ?'
  //           let [skill_idResult] = await connection.execute(sqlId2,[elem])

  //           const skill_id = skill_idResult.insertId;
  //           console.log("skill_idResult*************",skill_idResult[0].id2);
  //           console.log("project_id*************",projectId);
  //           console.log("skill_id*************",skill_id);

  //           const sqlProjectSkill = 'INSERT INTO project_skill (project_id, skill_id) VALUES (?, ?)'
  //           await connection.execute(sqlProjectSkill, [projectId,skill_idResult[0].id2 ]);
  //         }
  //         // await executeQuery(sqlSkill,[skill_name,finalId])
  //        }

  // /*
  //       let sql3 = 'INSERT INTO project_skill (project_id, skill_id) VALUES (?, ?)'
  //       await executeQuery(sql3, [projectId, skill_id]); */
  //       await connection.commit()
  //       return projectId;

  //     } catch (error) {
  //       await connection.rollback();
  //       throw error;
  //     }finally{
  //       connection.release()
  //     }
  //   };

  // 
  registerProject = async (values, skill_name) => {
    const connection = await dbPool.getConnection();
    try {
      await connection.beginTransaction();
  
      // Insert project
      let sql = `INSERT INTO project(project_title, project_city, project_country, project_description, project_type, project_status, project_max_member, creator_user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const [projectResult] = await connection.execute(sql, values);
      const projectId = projectResult.insertId;
  
      // Extract creator_user_id from values (assuming it's the last parameter)
      const creatorUserId = values[values.length - 1];
  
      // Insert project-creator relation into user_project
      let sqlUserProject = `INSERT INTO user_project (user_id, project_id, status) VALUES (?, ?, ?)`;
      await connection.execute(sqlUserProject, [creatorUserId, projectId, 2]); // Status = 2 (e.g., active/confirmed)
  
      // Process skills
      if (!Array.isArray(skill_name)) {
        skill_name =
          typeof skill_name === "string"
            ? skill_name
                .replace(/[\[\]]/g, "")
                .split(",")
                .map((skill) => skill.trim())
                .filter((skill) => skill)
            : [];
      }
  
      const skillIds = [];
  
      for (const elem of skill_name) {
        // Check if skill exists
        let sqlCheckSkill = "SELECT skill_id FROM skill WHERE skill_name = ?";
        let [existingSkill] = await connection.execute(sqlCheckSkill, [elem]);
  
        let skillId;
        if (existingSkill.length > 0) {
          skillId = existingSkill[0].skill_id; // Existing skill
        } else {
          // Get the next available skill ID
          let sqlMaxId = "SELECT MAX(skill_id) AS maxId FROM skill";
          let [maxIdResult] = await connection.execute(sqlMaxId);
  
          skillId = (maxIdResult[0].maxId !== null ? maxIdResult[0].maxId : 0) + 1;
  
          let sqlInsertSkill = "INSERT INTO skill (skill_id, skill_name) VALUES (?, ?)";
          await connection.execute(sqlInsertSkill, [skillId, elem]);
        }
  
        // Insert into project_skill table
        let sqlProjectSkill = "INSERT INTO project_skill (project_id, skill_id) VALUES (?, ?)";
        await connection.execute(sqlProjectSkill, [projectId, skillId]);
  
        skillIds.push(skillId);
      }
  
      await connection.commit();
      return projectId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  };
  

  allProjects = async (values) => {
    try {
      // let sql = 'SELECT p.project_id,p.project_title, p.project_description, s.skill_name, CONCAT(u.user_name, u.user_lastname) AS creator_name FROM project AS p JOIN user AS u ON p.creator_user_id = u.user_id JOIN project_skill AS ps ON p.project_id = ps.project_id JOIN skill AS s ON ps.skill_id = s.skill_id WHERE ps.project_skill_is_disabled = 0;'
      let sql = `SELECT 
    p.project_id, 
    p.project_title, 
    p.project_description,
    p.project_status,
    GROUP_CONCAT(DISTINCT s.skill_name ORDER BY s.skill_name SEPARATOR ', ') AS skills, 
    CONCAT(u.user_name, ' ', u.user_lastname) AS creator_name 
FROM project AS p 
JOIN user AS u ON p.creator_user_id = u.user_id 
JOIN project_skill AS ps ON p.project_id = ps.project_id 
JOIN skill AS s ON ps.skill_id = s.skill_id 
WHERE ps.project_skill_is_disabled = 0 AND p.project_type = 0
GROUP BY p.project_id, p.project_title, p.project_description, creator_name;
`;

      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  };

  oneUserProjects = async (values) => {
    try {
      let sql = 'SELECT p.project_id,p.project_title, p.project_description, p.project_status, CONCAT(u.user_name, u.user_lastname) AS creator_name FROM project AS p JOIN user AS u ON p.creator_user_id = u.user_id WHERE p.project_is_disabled = 0 AND u.user_id = ?;'

      const result = await executeQuery(sql, [values]);
      return result;
    } catch (error) {
      console.log("dal error", error);
      
      throw error;
    }
  };

  oneProject = async (project_id) => {
    //bring a skill show offers
    try {
      let sql =
        "SELECT p.project_id, p.project_title, p.project_description, p.project_link, p.project_type, p.project_status, u.user_id, CONCAT(u.user_name, ' ', u.user_lastname) AS user_name, f.field_name, CONCAT(c.user_name, ' ', c.user_lastname) AS creator_name, sk.skill_id, sk.skill_name, r.review_content, r.review_created_on, CONCAT(rev.user_name, ' ', rev.user_lastname) AS reviewer_name, off.offer_id, off.offer_title, off.offer_description FROM project p LEFT JOIN user_project up ON p.project_id = up.project_id LEFT JOIN user u ON up.user_id = u.user_id LEFT JOIN user_field uf ON u.user_id = uf.user_id LEFT JOIN field f ON uf.field_id = f.field_id LEFT JOIN user c ON p.creator_user_id = c.user_id LEFT JOIN user_skill us ON u.user_id = us.user_id LEFT JOIN skill sk ON us.skill_id = sk.skill_id LEFT JOIN review r ON u.user_id = r.reviewed_user_id LEFT JOIN user rev ON r.user_id = rev.user_id LEFT JOIN offer off ON p.project_id = off.project_id WHERE p.project_id = ? AND up.status = 2;";
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

  deleteproject = async (project_id) => {
    const connection = await dbPool.getConnection();
    try {
      await connection.beginTransaction();
      let sqlProject =
        "UPDATE project SET project_is_disabled = 1 WHERE project_id = ?";
      await connection.execute(sqlProject, [project_id]);

      let sqlSkill =
        "UPDATE project_skill SET project_skill_is_disabled = 1 WHERE project_id = ?";
      await connection.execute(sqlSkill, [project_id]);

      let sqlOffer = "UPDATE offer SET is_deleted = 1 WHERE project_id = ?"; //change by disabled
      await connection.execute(sqlOffer, [project_id]);

      let sqlUser = "UPDATE user_project SET status = 3 WHERE project_id = ?";
      await connection.execute(sqlUser, [project_id]);

      let sqlOffers = "SELECT offer_id FROM offer WHERE project_id = ?";
      const [offers] = await connection.execute(sqlOffers, [project_id]);
      console.log("offers", offers);

      if (offers.length > 0) {
        let offerIds = offers.map((offer) => offer.offer_id);
        let sqlUpdateOfferSkills = `UPDATE offer_skill SET offer_skill_is_disabled = 1 WHERE offer_id IN (${offerIds.join(
          ","
        )})`;
        await connection.execute(sqlUpdateOfferSkills);
      }

      await connection.commit();
    } catch (error) {
      console.log("EERROR", error);
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  };

  findprojects = async (skills) => {
    console.log("Skills in DAL:", skills);
  
    // Convert `skills` string to an array
    const skillArray = skills
      .replace(/[\[\]]/g, "") // Remove square brackets
      .split(",") // Split by comma
      .map((skill) => skill.trim());
  
    console.log("Skills in DAL after:", skillArray);
  
    if (skillArray.length === 0) {
      throw new Error("No skills provided.");
    }
  
    const placeholders = skillArray.map(() => "?").join(","); // Create placeholders for SQL query
    console.log("Placeholders:", placeholders);
  
    const connection = await dbPool.getConnection();
    try {
      // Obtener los proyectos que cumplen con las skills
      const projectSql = `
        SELECT DISTINCT p.*
        FROM project p
        JOIN project_skill ps ON p.project_id = ps.project_id
        JOIN skill s ON ps.skill_id = s.skill_id
        WHERE s.skill_name IN (${placeholders})
          AND ps.project_skill_is_disabled = 0
          AND p.project_is_disabled = 0
        GROUP BY p.project_id
        HAVING COUNT(DISTINCT s.skill_id) = ?;
      `;
  
      const [projects] = await connection.execute(projectSql, [
        ...skillArray,
        skillArray.length, // Ensures all skills are matched
      ]);
  
      if (projects.length === 0) {
        console.log("No projects found.");
        return [];
      }
  
      // Obtener todas las skills de los proyectos encontrados
      const projectIds = projects.map((p) => p.project_id);
      const skillPlaceholders = projectIds.map(() => "?").join(",");
  
      const skillSql = `
        SELECT ps.project_id, s.skill_name
        FROM project_skill ps
        JOIN skill s ON ps.skill_id = s.skill_id
        WHERE ps.project_id IN (${skillPlaceholders})
          AND ps.project_skill_is_disabled = 0;
      `;
  
      const [skillsResult] = await connection.execute(skillSql, projectIds);
  
      // Mapear las skills a cada proyecto
      const projectMap = projects.map((project) => ({
        ...project,
        skills: skillsResult
          .filter((s) => s.project_id === project.project_id)
          .map((s) => s.skill_name)
          .join(', ')
      }));
  
      console.log("Projects with skills:", projectMap);
      return projectMap;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    } finally {
      connection.release();
    }
  };



  joinRequest = async(values) =>{
    try {
      let sql = 'INSERT INTO request (user_id, project_id, offer_id) VALUES (?, ?, ?)' 
      await executeQuery(sql, values);

    } catch (error) {
      console.log("dal error", error);
      throw error;
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
