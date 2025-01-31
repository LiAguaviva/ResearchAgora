import { comparePassword, hashPassword } from "../../utils/hashUtils.js";
import { deleteFile } from '../../utils/deleteFile.js';
import userDal from "./user.dal.js";
import { emailValidationToken, generateToken, getIdFromToken, generateTokenPassword } from "../../utils/tokenUtils.js";
import { sendMailValidation, sendPasswordResetEmail  } from "../../services/emailService.js";
import { dbPool } from "../../config/db.js";
import {z} from "zod";
import {registerScheme} from '../../schemes/registerScheme.js'
import {loginScheme} from '../../schemes/loginScheme.js'
import {resetPasswordScheme} from '../../schemes/resetPasswordScheme.js'
import notificationDal from "../notification/notification.dal.js";
import projectDal from "../project/project.dal.js";


class UserController {
  register = async (req, res) => {
    try {
      const { email, password, repPassword } = registerScheme.parse(req.body);
      if (password !== repPassword) {
        throw new Error("B. Passwords mismatch");
      } else {
        const hash = await hashPassword(password);
        const result = await userDal.register([email, hash]);
        const token = await emailValidationToken(result.insertId);
        sendMailValidation(email, token)
        res.status(200).json({ msg: "ok" });
      }
    } catch (error) {
      if(error instanceof z.ZodError) {
        return res.status(400).json(error.errors[0].message)
      }
      res.status(500).json(error.message);
    }
  };

  
  login = async (req, res) => {  
    try {
      const { email, password } = loginScheme.parse(req.body);
      const result = await userDal.findUserbyEmail(email);
      if (result.length === 0) {
        
       res.status(401).json({ message: "check your email" });
      } else {
        const user = result[0];
        const match = await comparePassword(password, user.user_password);
        if (match) {         
          const token = generateToken(user.user_id);  
          res.status(200).json(token);
        } else {
          res.status(401).json({ message: "incorrect credentials" });
        }
      }
    } catch (error) {
      res.status(500).json(error.message);      
    }
  };

     verifyAccount = async (req, res) => {
      try {
        const {token} = req.params;
        const id = await getIdFromToken(token);
        const result = await userDal.verifyUser(id);
      } catch (error) {
        res.status(500).json(error.message);
      }       
    }

    forgottenPassword = async (req, res) => {     
      try {
      const { email } = req.body;         
      const user = await userDal.findUserbyEmail(email);         
      if (user.length === 0) {             
        return res.status(404).json({ message: "User not found" });         
      }        
      const token = generateTokenPassword(user[0].user_id); 
      sendPasswordResetEmail(email, token);         
      res.status(200).json({ message: "Password reset email sent" });     
    } catch (error) { 
      res.status(500).json({ message: error.message }); 
    } 
  }

    resetPassword = async (req, res) => {
      try {
        const {token} = req.params;
        const { newPassword, confirmNewPassword } = req.body;
        const parsedData = resetPasswordScheme.parse({
          newPassword, confirmNewPassword
        })
        const user_id = await getIdFromToken(token);
        const result = await userDal.resetPassword(user_id, parsedData.newPassword );
        res.status(200).json("password changed")
        
      } catch (error) {
        res.status(500).json(error.message);
      }       
    }


    findUserById = async (req, res) => {
      const id = getIdFromToken(req.token)
      const user = await userDal.getUserById(id)
      
    /*  
      
      user.forEach((elem)=>{
          if(elem.user_id){
              user = {
                  user_id: elem.user_id,
                  user_name: elem.user_name,
                  user_lastname: elem.user_lastname,
                  user_email: elem.user_email,
                  user_country: elem.user_country,
                  user_city: elem.user_city,
                  user_description: elem.user_description,
                  user_password: elem.user_password,
                  user_avatar: elem.user_avatar,
                  user_type: elem.user_type,
                  user_proficiency: elem.user_proficiency,
              }  //field transactions 
              user.push(user_id)
          }
      }
    
    )

       userData = {
        user: {
            user_id: user[0].user_id,
            user_name: user[0].name,
            user_lastname: user[0].lastname,
            user_email: user[0].email,
            user_country: user[0].user_country,
            user_city: user[0].user_city,
            birth_date: user[0].birth_date,
            avatar: user[0].avatar,
            type:user[0].type
        },
        user
      } */
      res.status(200).json(user)  
    }

    editUser = async (req, res) => {
      const data  = JSON.parse(req.body.edit)
      let img = null;
      if(req.file){
          img= req.file.filename;
          const currentUser = await userDal.getUserById(data.user_id);
          if (currentUser[0].user_avatar && currentUser[0].user_avatar !== img) {
            deleteFile(currentUser[0].user_avatar, 'useravatar'); 
        }

      }
      try {
        const {user_name, user_lastname, user_country, user_city, user_description, user_proficiency, user_current_lab, user_current_boss, skills, fields, user_id} = data; 
        const result = await  userDal.editUser([user_name, user_lastname, user_country, user_city, user_description, user_proficiency, user_current_lab, user_current_boss, user_id], req.file);
        if(skills != "" || !skills){
          const results = await this.saveTags(skills, user_id, 'skill');
        }
        if(fields != "" || !fields){
          const result1 = await this.saveTags(fields, user_id, 'field');
        }
        res.status(200).json({img})
      } catch (error) {
        res.status(500).json(error)
      }
    }

    saveTags = async (data, user_id, type ) => {
        try {
        let name = 'skill_name'
        let id = 'skill_id' 
         if(type === 'field'){
          name = 'field_name'
          id = 'field_id'
         } 
       
       const dataArray = data.split(','); 

       let finalArrayData = dataArray.map(e => e.trim())
       let result = await userDal.saveTags(type, name, user_id, id, finalArrayData)
       return result;
      } catch (error) {
        throw error;
        
      }    
    }

    deleteUser = async (req, res) => {
      const { user_id } = req.params;
      try {
        await userDal.deleteUser(user_id);
    
        const notificationContent = `User ${user_id} has been deleted.`;
    
        const notificationValues = [
          user_id, 
          5, 
          notificationContent,
          0
        ];
        
        await notificationDal.addNotification(notificationValues);
    
        res.status(200).json("User disabled and notified");
      } catch (error) {
        res.status(500).json(error);
      }
    };

      getskillsfields = async (req,res) => {
        const {id} = req.body;
        try {
          const result = await userDal.getskillsfields(id);
          res.status(200).json(result)
        } catch (error) {
          res.status(500).json(error);
        }
      }


      requestResponse = async (req,res) => {
        const {user_id, project_id, offer_id}  = req.body;
        const values = [user_id, project_id, offer_id];
        try {
           await userDal.requestResponse(values);
           res.status(200).json("ok")
        } catch (error) {         
          res.status(500).json(error)
        }
      }


      updateRequestStatus = async (req,res) => {
        const {user_id, project_id, offer_id, request_status,choose}  = req.body;
        const values = [user_id, project_id, offer_id];
        try {
           await userDal.updateRequestStatus(values, request_status,choose);
          
           
           res.status(200).json("ok")
        } catch (error) {
          res.status(500).json(error)
        }
      }

      findUsersBySkills = async (req, res) => {
        const {skills,name} = req.body;
        try {
          const result = await userDal.findUsersBySkills(skills,name);
          res.status(200).json(result);
          
        } catch (error) {
          res.status(500).json(error)
        }
      }

      allUsers  = async (req, res) => {
         try {
           const result = await userDal.allUsers();
           res.status(200).json(result)
  
         } catch (error) {    
          res.status(500).json(error) 
         }
      }

      GetResearcherById = async (req, res) => {
        const {user_id} = req.body
        try {
          const result = await userDal.GetResearcherById(user_id);
          res.status(200).json(result)
        } catch (error) {
          res.status(500).json(error)
        }
      }

      invite = async (req, res) => {
        const { sender_id, receiver_id, project_id, project_title } = req.body;
        try {
          await userDal.invite(req.body);
      
          const notificationContent = `You have been invited by ${sender_id} to join the project: ${project_title}`;
      
          const notificationValues = [
            receiver_id, 
            2, 
            notificationContent,
            0  
          ];
          
          await notificationDal.addNotification(notificationValues);
      
          res.status(200).json('Invitation sent');
        } catch (error) {
          res.status(500).json(error);
        }
      };

      invitationResponse = async (req, res) => {
        const { invitation_id, user_id, project_id, invitation_status } = req.body;
      
        try {
          await userDal.invitationResponse({ invitation_id, user_id, project_id }, invitation_status);
      
          const project = await projectDal.oneProject(project_id);
          const responder = await userDal.getUserById(user_id);
          
      
          if (!project || !responder) {
            return res.status(400).json({ error: "Project or user not found" });
          }
      
          const creatorId = project.project[0].creator_user_id;
          const projectName = project.project[0].project_title;
          const responderName = `${responder[0].user_name} ${responder[0].user_lastname}`;
      
      
          let notificationContent = "";
          let notificationType = 0;
      
          if (invitation_status === 1) { 
            notificationContent = `${responderName} has accepted the invitation to join your project "${projectName}".`;
            notificationType = 3;
          } else {
            notificationContent = `${responderName} has rejected the invitation to join your project "${projectName}".`;
            notificationType = 4;
          }
      
          const notificationValues = [
            creatorId, 
            notificationType, 
            notificationContent,
            0 
          ];
          
          await notificationDal.addNotification(notificationValues);
      
          res.status(200).json('Invitation response processed');
        } catch (error) {
          res.status(500).json(error);
        }
      };
      
      
      allrequests = async() => {
        try {
          const {user_id} = req.body;
          const result = await userDal.allrequests(user_id);
          res.status(200).json(result);
        } catch (error) {
          res.status(500).json(error);
        }
      }

      pendingrequeststatus = async(req,res) => {
        try {
          const {user_id,project_id} = req.body;
          const result = await userDal.pendingrequeststatus(user_id,project_id);
          res.status(200).json(result)
        } catch (error) {
          res.status(500).json(error);
        }
      }

      allinvites = async(req,res) => {
        try {
          const {user_id} = req.body;
          const result = await userDal.allinvites(user_id);
          res.status(200).json(result)
        } catch (error) {
          res.status(500).json(error);
        }
      }

}


export default new UserController();



