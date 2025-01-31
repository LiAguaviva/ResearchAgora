import { dbPool, executeQuery } from "../../config/db.js";

class ProjectDal {
  registerProject = async (values, skill_name) => {
    const connection = await dbPool.getConnection();
    try {
      await connection.beginTransaction();

      let sql = `INSERT INTO project(project_title, project_city, project_country, project_description, project_type, project_status, project_max_member, creator_user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const [projectResult] = await connection.execute(sql, values);
      const projectId = projectResult.insertId;

      const creatorUserId = values[values.length - 1];

      let sqlUserProject = `INSERT INTO user_project (user_id, project_id, status) VALUES (?, ?, ?)`;
      await connection.execute(sqlUserProject, [creatorUserId, projectId, 2]);
      // Status = 2 (e.g., active/confirmed)

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
        let sqlCheckSkill = "SELECT skill_id FROM skill WHERE skill_name = ?";
        let [existingSkill] = await connection.execute(sqlCheckSkill, [elem]);

        let skillId;
        if (existingSkill.length > 0) {
          skillId = existingSkill[0].skill_id;
        } else {
          let sqlMaxId = "SELECT MAX(skill_id) AS maxId FROM skill";
          let [maxIdResult] = await connection.execute(sqlMaxId);

          skillId =
            (maxIdResult[0].maxId !== null ? maxIdResult[0].maxId : 0) + 1;

          let sqlInsertSkill =
            "INSERT INTO skill (skill_id, skill_name) VALUES (?, ?)";
          await connection.execute(sqlInsertSkill, [skillId, elem]);
        }

        let sqlProjectSkill =
          "INSERT INTO project_skill (project_id, skill_id) VALUES (?, ?)";
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
      let sql = `SELECT 
                  p.project_id, 
                  p.project_title, 
                  p.project_description,
                  p.project_status,
                  GROUP_CONCAT(DISTINCT s.skill_name ORDER BY s.skill_name SEPARATOR ', ') AS skills, 
                  CONCAT(u.user_name, ' ', u.user_lastname) AS creator_name 
                    FROM project AS p 
                    JOIN user AS u ON p.creator_user_id = u.user_id 
                    LEFT JOIN project_skill AS ps ON p.project_id = ps.project_id AND ps.project_skill_is_disabled = 0
                    LEFT JOIN skill AS s ON ps.skill_id = s.skill_id 
                    WHERE p.project_type = 0 
                    AND p.project_is_disabled = 0 
                    GROUP BY p.project_id, p.project_title, p.project_description, creator_name;
    `;

      const result = await executeQuery(sql, values);
      return result;
    } catch (error) {
      throw error;
    }
  };

  oneUserProjects = async (user_id, inviter_id) => {
    try {
      let sql = `SELECT p.project_id, 
       p.project_title, 
       p.project_description, 
       p.project_status,
       p.creator_user_id, 
       CONCAT(u.user_name, ' ', u.user_lastname) AS creator_name
FROM project AS p
JOIN user AS u ON p.creator_user_id = u.user_id
JOIN user_project AS up_inviter 
       ON p.project_id = up_inviter.project_id  
       AND up_inviter.user_id = ?
LEFT JOIN user_project AS up_invited 
       ON p.project_id = up_invited.project_id 
       AND up_invited.user_id = ? 
       AND up_invited.status = 2  -- Solo toma filas con status = 2
WHERE p.project_is_disabled = 0 
  AND up_inviter.status = 2 
  AND up_invited.user_id IS NULL  -- Si hay una fila con status = 2, se excluye el proyecto
GROUP BY p.project_id, p.project_title, p.project_description, p.project_status, u.user_name, u.user_lastname;

`;

      const result = await executeQuery(sql, [user_id, inviter_id]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  oneResearcherProjects = async(user_id, inviter_id) => {
    try {
      let sql = `SELECT p.project_id, 
       p.project_title, 
       p.project_description, 
       p.project_status,
       p.creator_user_id, 
       CONCAT(u.user_name, ' ', u.user_lastname) AS creator_name
FROM project AS p
JOIN user AS u ON p.creator_user_id = u.user_id
JOIN user_project AS up_inviter 
       ON p.project_id = up_inviter.project_id  
       AND up_inviter.user_id = ?
LEFT JOIN user_project AS up_invited 
       ON p.project_id = up_invited.project_id 
       AND up_invited.user_id = ? 
       AND up_invited.status = 2  -- Solo toma filas con status = 2
WHERE p.project_is_disabled = 0 AND p.project_type = 0
  AND up_inviter.status = 2 
  AND up_invited.user_id IS NULL  -- Si hay una fila con status = 2, se excluye el proyecto
GROUP BY p.project_id, p.project_title, p.project_description, p.project_status, u.user_name, u.user_lastname;

`;

      const result = await executeQuery(sql, [user_id, inviter_id]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  oneUserAvailableProjects = async (user_id, inviter_id) => {
    try {
      let sql = `SELECT p.project_id,
       p.project_title,
       p.project_description,
       p.project_status,
       p.creator_user_id,
       CONCAT(u.user_name, ' ', u.user_lastname) AS creator_name
FROM project AS p
JOIN user AS u ON p.creator_user_id = u.user_id
JOIN user_project AS up_inviter
       ON p.project_id = up_inviter.project_id  
       AND up_inviter.user_id = 4
LEFT JOIN user_project AS up_invited
       ON p.project_id = up_invited.project_id
       AND up_invited.user_id = 3
       AND up_invited.status = 2  -- Solo toma filas con status = 2
WHERE p.project_is_disabled = 0 
AND p.project_status != 2
  AND up_inviter.status = 2
  AND up_invited.user_id IS NULL  -- Si hay una fila con status = 2, se excluye el proyecto
GROUP BY p.project_id, p.project_title, p.project_description, p.project_status, u.user_name, u.user_lastname;
`;

      const result = await executeQuery(sql, [user_id, inviter_id]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  oneProject = async (project_id) => {
    try {
      let sqlProject = `SELECT  
                          project_id, 
                          project_title, 
                          project_description, 
                          project_city,
                          project_country,
                          project_outcome,
                          project_max_member,
                          project_link, 
                          project_type, 
                          project_status, 
                          creator_user_id,
                          CONCAT(user_name, ' ', user_lastname) AS creator_name
                          FROM project
                          LEFT JOIN user creator_name ON creator_user_id = user_id
                          WHERE project_id = ?;`;

      const project = await executeQuery(sqlProject, [project_id]);

      let sqlMembers = `SELECT     
                          user.user_id,
                          user.user_avatar,     
                          CONCAT(user.user_name, ' ', user.user_lastname) AS user_name,    
                          GROUP_CONCAT(DISTINCT field.field_name ORDER BY field.field_name SEPARATOR ', ') 
                          AS fields FROM user_project
                          JOIN user ON user_project.user_id = user.user_id 
                          LEFT JOIN user_field ON user.user_id = user_field.user_id
                          LEFT JOIN field ON user_field.field_id = field.field_id 
                          WHERE user_project.project_id = ? 
                          AND user_project.status = 2 
                          GROUP BY user.user_id;`;

      const members = await executeQuery(sqlMembers, [project_id]);

      let sqlSkills = `SELECT     
                        project.project_id,    
                        project.project_title,    
                        skill.skill_id,    
                        skill.skill_name
                        FROM project
                        JOIN project_skill ON project.project_id = project_skill.project_id
                        JOIN skill ON project_skill.skill_id = skill.skill_id 
                        WHERE project.project_id = ?;`;

      const skills = await executeQuery(sqlSkills, [project_id]);
      
      let sqlReview = `SELECT 
                        review.review_content,
                        review.review_created_on,
                        reviewed_user.user_id AS reviewed_user_id,
                        reviewed_user.user_name AS reviewed_user_name,
                        reviewed_user.user_lastname AS reviewed_user_lastname,
                        reviewer.user_id AS reviewer_user_id,
                        reviewer.user_name AS reviewer_user_name,
                        reviewer.user_lastname AS reviewer_user_lastname,
                        reviewer.user_avatar AS reviewer_user_avatar,
                        review.review_rate,
                        project.project_title
                          FROM review
                          JOIN user AS reviewed_user ON review.reviewed_user_id = reviewed_user.user_id
                          JOIN user AS reviewer ON review.user_id = reviewer.user_id
                          JOIN project ON project.creator_user_id = reviewed_user.user_id
                          WHERE project.project_id = ?;`;

      const review = await executeQuery(sqlReview, [project_id]);

      let sqlOffers = `SELECT  
                        offer.offer_id, 
                        offer.offer_title, 
                        offer.offer_description, 
                        offer.number_of_position,
                        GROUP_CONCAT(DISTINCT skill.skill_name ORDER BY skill.skill_name SEPARATOR ', ') AS offer_skills
                          FROM offer 
                          LEFT JOIN offer_skill ON offer.offer_id = offer_skill.offer_id
                          LEFT JOIN skill ON offer_skill.skill_id = skill.skill_id
                          WHERE offer.project_id = ? AND offer.is_deleted = 0
                          GROUP BY offer.offer_id, offer.offer_title, offer.offer_description, offer.number_of_position;`;

      const offers = await executeQuery(sqlOffers, [project_id]);

      const result = { project, members, skills, offers, review };

      return result;
    } catch (error) {
      throw error;
    }
  };

  editProject = async (values) => {
    let sql =
      "UPDATE project SET project_title = ?, project_city = ?, project_country = ?, project_description = ?, project_type = ?, project_status = ?, project_outcome = ?, project_link = ?, project_max_member = ? WHERE project_id = ?";
   
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

      let sqlOffer = "UPDATE offer SET is_deleted = 1 WHERE project_id = ?";
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
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  };

  findprojects = async (skills) => {
    console.log("Skills in DAL:", skills);

    const skillArray = skills
      .replace(/[\[\]]/g, "")
      .split(",")
      .map((skill) => skill.trim());

    console.log("Skills in DAL after:", skillArray);

    if (skillArray.length === 0) {
      throw new Error("No skills provided.");
    }

    const placeholders = skillArray.map(() => "?").join(",");
    console.log("Placeholders:", placeholders);

    const connection = await dbPool.getConnection();
    try {
      const projectSql = `SELECT DISTINCT p.*, 
                            CONCAT(u.user_name, ' ', u.user_lastname) AS creator_name
                              FROM project p
                              JOIN project_skill ps ON p.project_id = ps.project_id
                              JOIN skill s ON ps.skill_id = s.skill_id
                              JOIN user u ON p.creator_user_id = u.user_id  -- Agregamos el JOIN con la tabla user
                              WHERE s.skill_name IN (${placeholders})
                                AND ps.project_skill_is_disabled = 0
                                AND p.project_is_disabled = 0
                              GROUP BY p.project_id
                              HAVING COUNT(DISTINCT s.skill_id) = ?;
      `;

      const [projects] = await connection.execute(projectSql, [
        ...skillArray,
        skillArray.length,
      ]);

      if (projects.length === 0) {
        console.log("No projects found.");
        return [];
      }

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

      const projectMap = projects.map((project) => ({
        ...project,
        skills: skillsResult
          .filter((s) => s.project_id === project.project_id)
          .map((s) => s.skill_name)
          .join(", "),
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

  allrequests = async (user_id, project_id) => {
    try {
      let sql = `SELECT *
      FROM request
      WHERE user_id = ? AND project_id = ?;`;
      const result = await executeQuery(sql, [user_id, project_id]);
      return result;
    } catch (error) {
      throw error;
    }
  };

  deleteMember = async (user_id, project_id) => {
    try {
        let deleteRequestsSQL = `DELETE FROM request WHERE user_id = ? AND project_id = ?;`;
        await executeQuery(deleteRequestsSQL, [user_id, project_id]);

        let updateUserProjectSQL = `UPDATE user_project SET status = 3 WHERE user_id = ? AND project_id = ?;`;
        await executeQuery(updateUserProjectSQL, [user_id, project_id]);

    } catch (error) {
      console.log("error in delete member",error);
      
        throw error;
    }
};

leaveProject = async(user_id, project_id) => {
  try {
    let sql = `DELETE FROM user_project  
               WHERE user_id = ? AND project_id = ?`;
    await executeQuery(sql, [user_id, project_id])
  } catch (error) {
    throw error;
  }
}

}

export default new ProjectDal();
