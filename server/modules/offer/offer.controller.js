import offerDal from "./offer.dal.js"

class OfferController {
createOffer = async (req, res) =>{
  try{
   const {offer_title, offer_description, number_of_position, skill_name} = req.body;
   const {project_id} = req.params;
   const values = [project_id, offer_title, offer_description, number_of_position];

  const result = await offerDal.createOffer(values, skill_name)
  res.status(200).json(result);

  }catch(error){
    res.status(500).json(error)
  }
}




allOffers = async (req,res)=>{
  try {
           const result = await offerDal.allOffers();
           res.status(200).json(result)
  
         } catch (error) {
          console.log(error);
          res.status(500).json(error) 
         }
}

deleteOffer =  async (req,res)=>{
  const {offer_id} = req.params
  try {
           const result = await offerDal.deleteOffer(offer_id);
           res.status(200).json(result)
  
         } catch (error) {
          console.log(error);
          res.status(500).json(error) 
         }
}

findOfferBySkill = async(req,res)=>{
  const skills = req.body;
          
          try {
            await offerDal.findOfferBySkill(skills)
                 res.status(200).json("offers found")
          } catch (error) {
            console.log(error);
            
            res.status(500).json(error)
          }
}
}
export default new OfferController();