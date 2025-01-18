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
    console.log("errrrr", error);
    
    res.status(500).json(error)
  }

}


}

export default new OfferController();