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
  //   // console.log("skill_name*********************before", skill_name);

  //   // if (Array.isArray(skill_name)) {
  //   //   skill_name = skill_name
  //   //     .map((skill) => skill.replace(/[\[\]]/g, "").trim()) // Remove brackets and trim
  //   //     .filter((skill) => skill); // Remove empty strings
  //   // } else if (typeof skill_name === "string") {
  //   //   skill_name = skill_name
  //   //     .replace(/[\[\]]/g, "") // Remove brackets
  //   //     .split(",") // Split into array
  //   //     .map((skill) => skill.trim()) // Trim whitespace
  //   //     .filter((skill) => skill); // Remove empty strings
  //   // } else {
  //   //   skill_name = []; // Default to an empty array if no valid skills
  //   // }

  //   // console.log("skill_name..........after", skill_name);

  //   const skillIds = [];
  //   for(const elem of skill_name){
  //    let sqlId = 'SELECT max(skill_id) AS id FROM skill'
  //    let [maxId] = await connection.execute(sqlId)
  
  //    skill_id = maxId[0].id != null ? maxId[0].id + 1 : 1;

  //       if(maxId[0].id != null) {
  //         finalId = maxId[0].id+1  
  //     // console.log(" finalId //////////////////",finalId);
  //     // console.log(" elemmmmmmmmmmmmmmmmm",elem); 
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
   
  //funciona pero hay que echarle un ojo
  createOffer = async (values, skill_name) => {  
    const connection = await dbPool.getConnection();   
    try {
      await connection.beginTransaction();
  
      // Insertar en la tabla 'offer'
      let sql = `INSERT INTO offer (project_id, offer_title, offer_description, number_of_position) VALUES (?, ?, ?, ?)`;
      const [offerResult] = await connection.execute(sql, values);
      const offerId = offerResult.insertId;

       let data = skill_name.split(",")
     
  
      // Procesar cada skill
      for (const elem of data) {
        // Buscar si la skill ya existe en la tabla 'skill'
        const sqlCheckSkill = 'SELECT skill_id FROM skill WHERE skill_name = ?';
        const [existingSkill] = await connection.execute(sqlCheckSkill, [elem]);
  
        let skill_id;
        if (existingSkill.length > 0) {
          // La skill ya existe, usar su skill_id
          skill_id = existingSkill[0].skill_id;
        } else {
          // La skill no existe, insertarla con un nuevo skill_id
          const sqlMaxId = 'SELECT max(skill_id) AS id FROM skill';
          const [maxId] = await connection.execute(sqlMaxId);
  
          skill_id = maxId[0].id != null ? maxId[0].id + 1 : 1; // Manejar tabla vacía
          const sqlInsertSkill = 'INSERT INTO skill (skill_id, skill_name) VALUES (?, ?)';
          await connection.execute(sqlInsertSkill, [skill_id, elem]);
        }
  
        // Asociar la skill al offer en la tabla 'offer_skill'
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
          let sql = 'SELECT o.offer_id, o.offer_title, o.offer_description, o.project_id, p.project_title, sk.skill_id, sk.skill_name FROM offer o JOIN project p ON o.project_id = p.project_id LEFT JOIN offer_skill os ON o.offer_id = os.offer_id LEFT JOIN skill sk ON os.skill_id = sk.skill_id WHERE o.is_deleted = 0;'
         
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

  findOfferBySkill = async ({ skills }) => {
    console.log("skills in dal", skills);
  
    // Convert `skills` string to an array
    const skillArray = skills
      .replace(/[\[\]]/g, "") // Remove square brackets
      .split(",") // Split by comma
      .map((skill) => skill.trim());
  
    console.log("skills in dal after", skillArray);
  
    if (skillArray.length === 0) {
      throw new Error("No skills provided.");
    }
  
    const placeholders = skillArray.map(() => "?").join(","); // Create placeholders for the SQL query
    console.log("placeholders",placeholders);
    
   
    const connection = await dbPool.getConnection();
    try {
      // Correct SQL query
      const sql = `
        SELECT DISTINCT o.*
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
            );
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
  


}


export default new OfferDal();