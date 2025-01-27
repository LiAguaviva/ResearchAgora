import reviewDal from "./review.dal.js";

class ReviewController {
  addReview = async(req,res) => {
    console.log("data in review controller",req.body);
    
    try {
      const {user,researcher,description,rating} = req.body;
      const values = [user,researcher,description,rating]
      const result = await reviewDal.addReview(values);
      res.status(200).json(result)
    } catch (error) {
        console.log("eerrrrrrr", error);
        res.status(500).json(error)  
    }
  }
  

}

export default new ReviewController();