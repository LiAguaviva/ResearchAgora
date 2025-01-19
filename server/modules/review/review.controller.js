import reviewDal from "./review.dal.js";

class ReviewController {
  addReview = async(req,res) => {
    try {
      const {user_id,reviewed_user_id,review_content} = req.body;
      const values = [user_id,reviewed_user_id,review_content]
      const result = await reviewDal.addReview(values);
      res.status(200).json(result)
    } catch (error) {
        console.log("eerrrrrrr", error);
        res.status(500).json(error)  
    }
  }
  

}

export default new ReviewController();