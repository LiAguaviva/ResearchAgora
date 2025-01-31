import { dbPool,executeQuery } from "../../config/db.js";

class ReviewDal {
  addReview = async(values) => {
    try {
      let sql = 'INSERT INTO review (user_id,reviewed_user_id,review_content,review_rate) VALUES (?,?,?,?)'
      const result = await executeQuery(sql,values);
      return result; 
    } catch (error) {
      throw error
    }
    
  }
}

export default new ReviewDal();