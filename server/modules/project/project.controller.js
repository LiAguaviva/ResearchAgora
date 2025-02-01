
import { createProjectScheme } from "../../schemes/createProjectScheme.js";
import notificationDal from "../notification/notification.dal.js";
import userDal from "../user/user.dal.js";
import projectDal from "./project.dal.js";
import {z} from "zod";



class ProjectController {

    addproject = async (req, res) =>{
      try {
        const {title, city, country, description, max_member, type, skill_name} = req.body;
        const {creator_user_id} = req.params;
        const values = [title, city, country, description, type, max_member, creator_user_id];
        const result = await projectDal.registerProject(values, skill_name);

        res.status(200).json(result)

      } catch (error) {
        if(error instanceof z.ZodError) {
          console.log(error.errors[0].message)
          return res.status(400).json(error.errors[0].message)
        }
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
       res.status(500).json(error) 
      }
   } 

   oneresearcherprojects = async (req, res) => {
    const {user_id, inviter_id} = req.body;
    try {
      const result = await projectDal.oneResearcherProjects(user_id,inviter_id);
      res.status(200).json(result)

    } catch (error) {
     res.status(500).json(error) 
    }
 } 

   oneUserAvailableProjects = async (req, res) => {
      const {user_id, inviter_id} = req.body;
      try {
        const result = await projectDal.oneUserAvailableProjects(user_id,inviter_id);
        res.status(200).json(result)

      } catch (error) {
       res.status(500).json(error) 
      }
   } 

    oneproject = async (req, res) => {
      try {
        const {project_id} = req.params;
        const result = await projectDal.oneProject(project_id);   
        res.status(200).json(result)
      } catch (error) {
        res.status(500).json(error) 
      }
    }

    editproject = async (req, res) => {
      try {
         const {id, title, city, country, description, type, status, outcome, link, max_member, skill} = req.body;
        console.log('editproject controller', req.body);
        
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
        await projectDal.deleteMember(user_id, project_id);
        const remover = await userDal.getUserById(userID);
        const project = await projectDal.oneProject(project_id);
        const removerName = remover ? `${remover.user_name} ${remover.user_lastname}` : "Someone";
        const projectName = project ? project.project_title : "a project";

        const notificationContent = `You have been removed from ${projectName} by ${removerName}`;
    
        const notificationValues = [
          user_id,  
          5,     
          notificationContent,
          0      
        ];

        await notificationDal.addNotification(notificationValues);

        res.status(200).json('User removed and notified');
      } catch (error) {
        res.status(500).json(error);
      }
    }


    leaveProject = async (req, res) => {
      try {
        const { user_id, project_id } = req.body;

        await projectDal.leaveProject(user_id, project_id);

        const user = await userDal.getUserById(user_id);
        const project = await projectDal.oneProject(project_id);

        const userName = user ? `${user.user_name} ${user.user_lastname}` : "Someone";
        const projectName = project ? project.project_title : "a project";
        const creatorId = project.creator_user_id; 

        // Send Notification to Project Creator
        const notificationContent = `${userName} left the project ${projectName}`;

        const notificationValues = [
          creatorId,  
          6,          
          notificationContent,
          0         
        ];
        await notificationDal.addNotification(notificationValues);

        res.status(200).json('User left and creator notified');
      } catch (error) {
        res.status(500).json(error);
      }
};


    
   

}

export default new ProjectController();