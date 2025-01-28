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
    const {skills} = req.body;
            try {
              const result = await offerDal.findOfferBySkill(skills)
              res.status(200).json(result)
            } catch (error) {
              console.log(error);
              
              res.status(500).json(error)
            }
  }

  offersByProject = async(req, res) => {
    try {
      const {project_id} = req.params;
      const result = await offerDal.offersByProject(project_id)
      // console.log('result on CONTROLLER', result);
      // console.log('req.params CONTROLLER', req.params);
      
      res.status(200).json(result)
    } catch (error) {
      
      console.log(error);
      res.status(500).json(error)      
    }

  }

  joinRequest = async(req, res) => {
    const {user_id, project_id, offer_id}  = req.body;
    const values = [user_id, project_id, offer_id];
    try {
       await offerDal.joinRequest(values); 
       res.status(200).json("ok")
    } catch (error) {   
      console.log('error JOINREQUEST', error);
      
      res.status(500).json(error)
    }
  }

  /* editoffer = async(req, res) => {
    console.log('editoffer req.body', req.body);

    try {
      

    } catch (error) {
      res.status(500).json(error)  
    }
  } */



  oneOffer = async(req,res) => {
      const {offer_id} = req.params;

    try {
     const result = await offerDal.oneOffer(offer_id); 
     console.log("result",result);
     res.status(200).json(result)
     

    } catch (error) {
      res.status(500).json(error)
      console.log('ONEOFFER', error);  
    }
  }

  updateOffer = async(req,res) => {
    try{
      const {offer_id, offer_title, number_of_position, offer_description, is_deleted,  project_id, skill} = req.body;
      const values = {offer_id, offer_title, number_of_position, offer_description,  is_deleted, project_id, skill}; 
         console.log("req body*********************", req.body );
   

     const result = await offerDal.updateOffer(values) 
     const result2 = await this.editSkill(skill, offer_id)
     res.status(200).json(result);
   
     }catch(error){
      console.log('updateOffer', error)
       res.status(500).json(error)
     }
   }

    editSkill = async (data, id) => {
          try {
            const dataArray = data.split(','); 
            let finalArrayData = dataArray.map(e => e.trim())
            let result = await offerDal.editSkill(id, finalArrayData)
            console.log("^^^^^^", id);
            console.log("&&&&&&", data);            
            return result;
          } catch (error) {
             throw error;
          }
        }


}
export default new OfferController();