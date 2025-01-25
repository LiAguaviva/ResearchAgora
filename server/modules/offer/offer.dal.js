import { dbPool,executeQuery } from "../../config/db.js";


class OfferDal {
  // createOffer = async(values, skill_name) => {  
  // const connection = await dbPool.getConnection();   
    
  // try{
  //   await connection.beginTransaction();
  //   let sql = `INSERT INTO offer( project_id, offer_title, offer_description, number_of_position) VALUES (?, ?, ?, ?)`
  //   // values[3] = Number(values[3]); //delete once front is running
  //   const [offerResult] = await connection.execute(sql, values);
  //   const offerId = offerResult.insertId;

  //   let finalId = 1;
     // console.log("skill_name*********************before", skill_name);

   // if (Array.isArray(skill_name)) {
     //   skill_name = skill_name
   //     .map((skill) => skill.replace(/[\[\]]/g, "").trim()) // Remove brackets and trim
   //     .filter((skill) => skill); // Remove empty strings
     // } else if (typeof skill_name === "string") {
     //   skill_name = skill_name
     //     .replace(/[\[\]]/g, "") // Remove brackets
     //     .split(",") // Split into array
     //     .map((skill) => skill.trim()) // Trim whitespace
     //     .filter((skill) => skill); // Remove empty strings
    // } else {
    //   skill_name = []; // Default to an empty array if no valid skills
     // }

     // console.log("skill_name..........after", skill_name);

  //   const skillIds = [];
  //   for(const elem of skill_name){
  //    let sqlId = 'SELECT max(skill_id) AS id FROM skill'
  //    let [maxId] = await connection.execute(sqlId)
  
  //    skill_id = maxId[0].id != null ? maxId[0].id + 1 : 1;

  //       if(maxId[0].id != null) {
  //         finalId = maxId[0].id+1  
       // console.log(" finalId //////////////////",finalId);
       // console.log(" elemmmmmmmmmmmmmmmmm",elem); 
  //     const sqlSkill = 'INSERT INTO skill (skill_id, skill_name) VALUES (?,?)'
  //     const skill_id = finalId;
  //      console.log("skill id", skill_id);
  //      console.log("eleeeem", elem);
       
  //     await connection.execute(sqlSkill, [finalId,elem ])
  //         let sqlId2 = 'SELECT skill_id AS id2 FROM skill WHERE skill_name = ?'
  //         let [skill_idResult] = await connection.execute(sqlId2, [elem])

       
  //         const sqlOfferSkill = 'INSERT INTO offer_skill  (offer_id, skill_id) VALUES (?, ?)'
  //         await connection.execute(sqlOfferSkill, [offerId,skill_idResult[0].id2 ]);
  //       }   
  //     }
  //    await connection.commit()
  //    return offerId;
        
  // } catch (error) {
  //   await connection.rollback();
  //   throw error;
  // }finally{
  //   connection.release()
  // }
  //};
   
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
    console.log('in offer dal');
    
    try {
      let sql = `SELECT o.offer_id, o.offer_title, o.number_of_position, o.offer_description, o.project_id, p.project_title,
      GROUP_CONCAT(DISTINCT sk.skill_name ORDER BY sk.skill_name SEPARATOR ', ') AS skills
      FROM offer o 
      JOIN project p ON o.project_id = p.project_id 
      LEFT JOIN offer_skill os ON o.offer_id = os.offer_id 
      LEFT JOIN skill sk ON os.skill_id = sk.skill_id 
      WHERE o.is_deleted = 0
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
      console.log("EERROR", error);
      await connection.rollback();
      throw error;
    }finally{
      connection.release();
    }
  }

  findOfferBySkill = async (skills) => {
    console.log("skills in dal", skills);
  
    const skillArray = skills
      .replace(/[\[\]]/g, "") // Remove square brackets
      .split(",") // Split by comma
      .map((skill) => skill.trim());
  
    console.log("skills in dal after", skillArray);
  
    if (skillArray.length === 0) {
      throw new Error("No skills provided.");
    }
  
    const placeholders = skillArray.map(() => "?").join(","); 
    console.log("placeholders",placeholders);
    
   
    const connection = await dbPool.getConnection();
    try {
      // Correct SQL query
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
WHERE s.skill_name IN (${placeholders})
  AND os.offer_skill_is_disabled = 0
  AND o.is_deleted = 0
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
  
      console.log("offers found:", offers);
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
      AND offer.project_id = ?`

      const result = await executeQuery(sql, project_id);
      console.log('result en DAAAAALLLLL', result);
      
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
      console.log("dal error", error);
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
         console.log("oneOffer error", error);
         throw error;
       }
    }

    updateOffer = async (values) => {
      const connection = await db.getConnection(); 
      const{ offer_id, offer_title, offer_description, number_of_position, is_deleted, project_id, skill} = values; 
      try {     
        await connection.beginTransaction(); 
         let sqlOffer =  'UPDATE  offer SET offer_title = ?, offer_description = ?, number_of_position = ? WHERE offer_id = ?'      
             
      const resultOffer =   await connection.execute(sqlOffer, [offer_title, offer_description, number_of_position, offer_id])
        
            
           let sqlSkillRemove = 'DELETE FROM offer_skill WHERE offer_id = ? AND skill_id IN (?)'        
            const resultSkillRemove =   await connection.execute(sqlSkillRemove, [offer_id, skillsToRemove])   
        
             
          let sqlSkillAdd =  'INSERT INTO offer_skill (offer_id, skill_id, offer_skill_is_disabled) VALUES (?, ?, ?)'        
                 
            const resultSkillAdd =   await connection.execute(sqlSkillAdd, [skillValues] ) 
          
           
          for (const skill of skillsToEdit) {         
            const { skill_id, skill_name } = skill;         
            let sqlSkillEdit = 'UPDATE skill SET skill_name = ? WHERE skill_id = ?'         
                
              const result =   await connection.execute(sqlSkillEdit, [skill_name, skill_id])
               
          }    
            
        await connection.commit();
        return "offer updated correctly"
        
      } catch (error) { 
        await connection.rollback();
        throw error
      } finally { 
        connection.release(); 
      }
    }
  }


export default new OfferDal();