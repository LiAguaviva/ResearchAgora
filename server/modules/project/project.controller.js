
import notificationDal from "../notification/notification.dal.js";
import projectDal from "./project.dal.js";


class ProjectController {

    addproject = async (req, res) =>{
      try {
        const {title, city, country, description, max_member, type, status, skill_name} = req.body;
        const {creator_user_id} = req.params;
        const values = [title, city, country, description, type, status, max_member, creator_user_id];

        const result = await projectDal.registerProject(values, skill_name);
 
        res.status(200).json(result)
      } catch (error) {
        console.log("eerrrrrrr", error);
        res.status(500).json(error)    
        
     }   
    }

    allprojects = async (req, res) => {
       try {
         const result = await projectDal.allProjects();
         res.status(200).json(result)

       } catch (error) {
        res.status(500).json(error) 
       }
    }

    oneuserprojects = async (req, res) => {
      const {user_id, inviter_id} = req.body;
      try {
        const result = await projectDal.oneUserProjects(user_id,inviter_id);
        res.status(200).json(result)

      } catch (error) {
        console.log("controller error", error);
        
       res.status(500).json(error) 
      }
   } 

   oneresearcherprojects = async (req, res) => {
    const {user_id, inviter_id} = req.body;
    try {
      const result = await projectDal.oneResearcherProjects(user_id,inviter_id);
      res.status(200).json(result)

    } catch (error) {
      console.log("controller error", error);
      
     res.status(500).json(error) 
    }
 } 

   oneUserAvailableProjects = async (req, res) => {
      const {user_id, inviter_id} = req.body;
      try {
        const result = await projectDal.oneUserAvailableProjects(user_id,inviter_id);
        res.status(200).json(result)

      } catch (error) {
        console.log("controller error", error);
        
       res.status(500).json(error) 
      }
   } 

    oneproject = async (req, res) => {
      try {
        const {project_id} = req.params;
        const result = await projectDal.oneProject(project_id);   
        console.log('EL BACK MANDA ESTE RESULTADO --->', result)   
        console.log('EL BACK MANDA EL PROJECT ID --->', project_id)   
        res.status(200).json(result)
      } catch (error) {
        console.log("eerror", error);
        
        res.status(500).json(error) 
      }
    }

    editproject = async (req, res) => {
      console.log("reqqqqqq", req.body);
      try {
         const {id, title, city, country, description, type, status, outcome, link, max_member, skill} = req.body;

         const result = await projectDal.editProject([title, city, country, description, type, status, outcome, link, max_member, id]);
         const result2 = await this.editSkill(skill, id)
         res.status(200).json('ok')
      } catch (error) {
        res.status(500).json(error)
        console.log("EEEE", error);
        
      }
    }

     editSkill = async (data, id) => {
       try {
         const dataArray = data.split(','); 
         let finalArrayData = dataArray.map(e => e.trim())
         let result = await projectDal.editSkill(id, finalArrayData)
         return result;
       } catch (error) {
          throw error;
       }
     }
    
     deleteproject = async (req, res) => {
         const {project_id} = req.params;
             try{
               await projectDal.deleteproject(project_id)
               res.status(200).json("project disabled")
             }catch (error){
              console.log("eeeeeeeeeee", error);
              
                res.status(500).json(error)
            }
     }


    findProjectBySkills = async(req, res) => {
        const {skills} = req.body;
        
        try {
          const result = await projectDal.findprojects(skills)
               res.status(200).json(result)
        } catch (error) {
          res.status(500).json(error)
        }                
    }
 
    allrequests = async (req,res) => {
      try {
        const {user_id, project_id} = req.body;
        const result = await projectDal.allrequests(user_id, project_id);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json(error);
      }
    }

    deleteMember = async(req,res) => {
      try {
        const {user_id,userID, project_id} = req.body;
        console.log('PPPPPPPPP ->', user_id, project_id)
        await projectDal.deleteMember(user_id, project_id);
        const notificationValues = [
          user_id, 2 ,userID, `You have been removed from the project`, 0, project_id
        ];
        await notificationDal.addNotification(notificationValues);
        res.status(200).json('User removed and notified');
      } catch (error) {
        console.log("error in del member comtroller",error);
        
        res.status(500).json(error);
      }
    }

    leaveProject = async (req,res) => {
      try {
        const {user_id, project_id} = req.body;
        await projectDal.leaveProject(user_id, project_id);
        res.status(200).json('ok')
      } catch (error) {
        res.status(500).json(error)
      }
    }


    
   

}

export default new ProjectController();