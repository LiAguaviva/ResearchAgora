import projectDal from "./project.dal.js";


class ProjectController {

  addproject = async (req, res) =>{
    try {
      const {title, city, country, description, max_member, type} = req.body;
      const {creator_user_id} = req.params;
      const values = [title, city, country, description, max_member, type, creator_user_id];
  
      const result = await projectDal.registerProject(values);
    } catch (error) {
      console.log("errrrrorrrr", error);
      res.status(500).json(error)    
    }
    
    
  }

  // allprojects = async (req, res) => {

  // }


}

export default new ProjectController();