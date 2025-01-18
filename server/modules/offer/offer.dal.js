import { dbPool } from "../../config/db.js";


class OfferDal {
createOffer = async(values, skill_name) => {
  console.log("Values for offer insertion:", values);
console.log("Skill names processed:", skill_name);
  
  const connection = await dbPool.getConnection();
  try{
    await connection.beginTransaction();
    let sql = `INSERT INTO offer( project_id, offer_title, offer_description, number_of_position) VALUES (?, ?, ?, ?)`
    values[3] = Number(values[3]); //delete once front is running
    const [offerResult] = await connection.execute(sql, values);
    const offerId = offerResult.insertId;

    let finalId = 1;
    console.log("skill_name*********************before", skill_name);

    if (Array.isArray(skill_name)) {
      skill_name = skill_name
        .map((skill) => skill.replace(/[\[\]]/g, "").trim()) // Remove brackets and trim
        .filter((skill) => skill); // Remove empty strings
    } else if (typeof skill_name === "string") {
      skill_name = skill_name
        .replace(/[\[\]]/g, "") // Remove brackets
        .split(",") // Split into array
        .map((skill) => skill.trim()) // Trim whitespace
        .filter((skill) => skill); // Remove empty strings
    } else {
      skill_name = []; // Default to an empty array if no valid skills
    }

    console.log("skill_name..........after", skill_name);

    const skillIds = [];
    for(const elem of skill_name){
     let sqlId = 'SELECT max(skill_id) AS id FROM skill'
     let [maxId] = await connection.execute(sqlId)
    
     console.log("max iddddddddddddd",maxId);
     console.log("max id.iddddddddddd",maxId[0].id); 
        if(maxId[0].id != null) {
          finalId = maxId[0].id+1  
      console.log(" finalId //////////////////",finalId);
      console.log(" elemmmmmmmmmmmmmmmmm",elem); 
      const sqlSkill = 'INSERT INTO skill (skill_id, skill_name) VALUES (?,?)'
      const skill_id = finalId;
      console.log(skill_id);
      await connection.execute(sqlSkill, [finalId,elem ])
          let sqlId2 = 'SELECT skill_id AS id2 FROM skill WHERE skill_name = ?'
          let [skill_idResult] = await connection.execute(sqlId2,[elem])

         // const skill_id = skill_idResult.insertId;
          
          console.log("skill_idResult*************",skill_idResult[0].id2);
          console.log("offer_id*************",offerId);
          console.log("skill_id*************",skill_id);
          const sqlOfferSkill = 'INSERT INTO offer_skill (offer_id, skill_id) VALUES (?, ?)'
          await connection.execute(sqlOfferSkill, [offerId,skill_idResult[0].id2 ]);
        }   
      }
     await connection.commit()
     return offerId;
        
  } catch (error) {
    await connection.rollback();
    throw error;
  }finally{
    connection.release()
  }
  };

}


export default new OfferDal();