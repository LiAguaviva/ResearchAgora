import reviewDal from "./review.dal.js";

class ReviewController {
  addReview = async(req,res) => {
    
    try {
      const {user,researcher,description,rating} = req.body;
      const values = [user,researcher,description,rating]
      const result = await reviewDal.addReview(values);
      res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)  
    }
  }
  

}

export default new ReviewController();