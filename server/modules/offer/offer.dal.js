import { dbPool,executeQuery } from "../../config/db.js";


class OfferDal {
    
  createOffer = async (values, skill_name) => {  
    const connection = await dbPool.getConnection();   
    try {
      await connection.beginTransaction();
  
      let sql = `INSERT INTO offer (project_id, offer_title, offer_description, number_of_position) VALUES (?, ?, ?, ?)`;
      const [offerResult] = await connection.execute(sql, values);
      const offerId = offerResult.insertId;

       let data = skill_name.split(",")
     
  
      for (const elem of data) {
        const sqlCheckSkill = 'SELECT skill_id FROM skill WHERE skill_name = ?';
        const [existingSkill] = await connection.execute(sqlCheckSkill, [elem]);
  
        let skill_id;
        if (existingSkill.length > 0) {
        
          skill_id = existingSkill[0].skill_id;
        } else {
         
          const sqlMaxId = 'SELECT max(skill_id) AS id FROM skill';
          const [maxId] = await connection.execute(sqlMaxId);
  
          skill_id = maxId[0].id != null ? maxId[0].id + 1 : 1; 
          const sqlInsertSkill = 'INSERT INTO skill (skill_id, skill_name) VALUES (?, ?)';
          await connection.execute(sqlInsertSkill, [skill_id, elem]);
        }
  
     
        const sqlOfferSkill = 'INSERT INTO offer_skill (offer_id, skill_id) VALUES (?, ?)';
        await connection.execute(sqlOfferSkill, [offerId, skill_id]);
      }
  
      await connection.commit();
      return offerId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  };
  
  allOffers = async () => {
    
    try {
      let sql = `SELECT o.offer_id, o.offer_title, o.number_of_position, o.offer_description, o.project_id, p.project_title,
      GROUP_CONCAT(DISTINCT sk.skill_name ORDER BY sk.skill_name SEPARATOR ', ') AS skills
      FROM offer o 
      JOIN project p ON o.project_id = p.project_id 
      LEFT JOIN offer_skill os ON o.offer_id = os.offer_id 
      LEFT JOIN skill sk ON os.skill_id = sk.skill_id 
      WHERE o.is_deleted = 0
      AND p.project_type = 0
      AND p.project_is_disabled = 0
      AND p.project_status != 2
      GROUP BY o.offer_id, o.offer_title, o.number_of_position, o.offer_description, o.project_id
;`
         
          const result = await executeQuery(sql);
          return result; 
    } catch (error) {
      throw error;
    }
  }

  deleteOffer = async (offer_id) => {
    const connection = await dbPool.getConnection();
    try{
      await connection.beginTransaction();
      let sqlOffer = 'UPDATE offer SET is_deleted = 1 WHERE offer_id = ?'
      await connection.execute(sqlOffer, [offer_id]);
      
       let sqlOfferSkill = 'UPDATE offer_skill SET offer_skill_is_disabled = 1 WHERE offer_id = ?'  
       await connection.execute(sqlOfferSkill, [offer_id]);
      
      await connection.commit();   
    }catch (error){
      await connection.rollback();
      throw error;
    }finally{
      connection.release();
    }
  }

  findOfferBySkill = async (skills) => {
  
    const skillArray = skills
      .replace(/[\[\]]/g, "") 
      .split(",") 
      .map((skill) => skill.trim());
  
    console.log("skills in dal after", skillArray);
  
    if (skillArray.length === 0) {
      throw new Error("No skills provided.");
    }
  
    const placeholders = skillArray.map(() => "?").join(","); 
    console.log("placeholders",placeholders);
    
   
    const connection = await dbPool.getConnection();
    try {
      const sql = `
SELECT o.*,
       (SELECT GROUP_CONCAT(s2.skill_name ORDER BY s2.skill_name SEPARATOR ', ')
        FROM offer_skill os2
        JOIN skill s2 ON os2.skill_id = s2.skill_id
        WHERE os2.offer_id = o.offer_id
          AND os2.offer_skill_is_disabled = 0
       ) AS skills
FROM offer o
JOIN offer_skill os ON o.offer_id = os.offer_id
JOIN skill s ON os.skill_id = s.skill_id
JOIN project p ON o.project_id = p.project_id  -- Relación con la tabla de proyectos
WHERE s.skill_name IN (${placeholders})
  AND os.offer_skill_is_disabled = 0
  AND o.is_deleted = 0
  AND p.project_type = 0  -- Solo proyectos públicos
  AND p.project_status != 2  -- Excluir proyectos completados
  AND o.offer_id IN (
    SELECT os2.offer_id
    FROM offer_skill os2
    JOIN skill s2 ON os2.skill_id = s2.skill_id
    WHERE s2.skill_name IN (${placeholders})
      AND os2.offer_skill_is_disabled = 0
    GROUP BY os2.offer_id
    HAVING COUNT(DISTINCT s2.skill_id) = ?
  )
GROUP BY o.offer_id;

      `;
  
      const [offers] = await connection.execute(sql, [...skillArray, ...skillArray, skillArray.length]);
  
      await connection.commit();   
      return offers;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release(); 
    }
  };

  offersByProject = async (project_id) => {
    try {
      const sql = `
      SELECT offer.offer_id, offer.offer_title 
      FROM offer 
      WHERE offer.is_deleted = 0
      AND offer.project_id = ? AND offer.number_of_position > 0`

      const result = await executeQuery(sql, project_id);
      return result;

    } catch (error) {
      throw error;
    }
  }

  joinRequest = async(values) =>{
    try {
      let sql = 'INSERT INTO request (user_id, project_id, offer_id) VALUES (?, ?, ?)' 
      await executeQuery(sql, values);

    } catch (error) {
      throw error;
    }
  }
  
     oneOffer = async(offer_id)=> {
       try {
        let sql = `SELECT    
            o.offer_id,
            o.offer_title, 
            o.offer_description, 
            o.number_of_position,
            o.is_deleted,  
            o.project_id, 
            s.skill_id,   
            s.skill_name 
             FROM  offer o 
             LEFT JOIN     offer_skill os 
             ON o.offer_id = os.offer_id 
              LEFT JOIN skill s 
                  ON os.skill_id = s.skill_id 
                  WHERE o.is_deleted = 0 AND o.offer_id = ?;`
        const result = await executeQuery(sql, [offer_id]);
        return result;
        
       } catch (error) {
         throw error;
       }
    }

    updateOffer = async (values) => {
      
      const{offer_title, number_of_position, offer_description, skill, is_deleted, project_id,  offer_id} = values; 
      let sql =
      "UPDATE offer SET offer_title = ?, number_of_position = ?, offer_description = ?  WHERE offer_id = ?";

    try {
      const result = await executeQuery(sql, [offer_title, number_of_position, offer_description, offer_id]);
      return result;
    } catch (error) {
      throw error;
    }

    }

    editSkill = async (offer_id, finalArrayData) => {
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
        let sql3 = "DELETE FROM offer_skill WHERE offer_id = ?";
        await connection.execute(sql3, [offer_id]);
        let sql4 =
          "INSERT INTO offer_skill (offer_id, skill_id) VALUES (?, ?)";
        for (const elem of result) {
          await connection.execute(sql4, [offer_id, elem.skill_id]);
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



  }


export default new OfferDal();