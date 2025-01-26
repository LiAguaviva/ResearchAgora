import { comparePassword, hashPassword } from "../../utils/hashUtils.js";
import userDal from "./user.dal.js";
import { registerSchema } from "../../schemas/registerSchema.js";
import { emailValidationToken, generateToken, getIdFromToken, generateTokenPassword } from "../../utils/tokenUtils.js";
import { loginSchema } from "../../schemas/loginSchema.js";
import { sendMailValidation, sendPasswordResetEmail  } from "../../services/emailService.js";
import { dbPool } from "../../config/db.js";
import {z} from "zod";
import { resetPasswordScheme } from "../../schemas/resetPasswordScheme.js";


class UserController {
  register = async (req, res) => {
    try {
      const { email, password, repPassword } = registerSchema.parse(req.body);
      if (password !== repPassword) {
        throw new Error("B. Passwords mismatch");
      } else {
        const hash = await hashPassword(password);
        const result = await userDal.register([email, hash]);
        const token = await emailValidationToken(result.insertId);
        // console.log("0000000000000000000", token);
        sendMailValidation(email, token)
        res.status(200).json({ msg: "ok" });
      }
    } catch (error) {
      if(error instanceof z.ZodError) {
        console.log(error.errors[0].message)
        return res.status(400).json(error.errors[0].message)
      }
      res.status(500).json(error.message);
    }
  };

  
  login = async (req, res) => {  
    try {
      const { email, password } = loginSchema.parse(req.body);
      const result = await userDal.findUserbyEmail(email);
      // console.log("++++++++++++++++++++++", result);
      if (result.length === 0) {
        
        // console.log("not verified");   
       res.status(401).json({ message: "check your email" });
      } else {
        const user = result[0];
        const match = await comparePassword(password, user.user_password);
        if (match) {         
          const token = generateToken(user.user_id);  
          // console.log(token);        
          res.status(200).json(token);
        } else {
          res.status(401).json({ message: "incorrect credentials" });
        }
      }
    } catch (error) {
      // console.log("erRROOOOOOOOOOOOOrrrr", error);
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
      console.log(email)
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
        console.log(result);
        res.status(200).json("password changed")
        
      } catch (error) {
        res.status(500).json(error.message);
      }       
    }


    findUserById = async (req, res) => {
      const id = getIdFromToken(req.token)
      console.log("Id", id);
      const user = await userDal.getUserById(id)
      console.log("usssssssssser", user);
      
    /*   let userData ={}
      let travel = {}
      let travels =[]
      
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
      // console.log("reqqqqqq", JSON.parse(req.body.edit));
      // console.log("fileeeee", req.file);
      const data  = JSON.parse(req.body.edit)
      let img = null;
      if(req.file){
          img= req.file.filename
      }
      try {
        const {user_name, user_lastname, user_country, user_city, user_description, user_proficiency, user_current_lab, user_current_boss, skills, fields, user_id} = data; //req.body.data
        const result = await  userDal.editUser([user_name, user_lastname, user_country, user_city, user_description, user_proficiency, user_current_lab, user_current_boss, user_id], req.file);
        if(skills != "" || !skills){
          const results = await this.saveTags(skills, user_id, 'skill');
        }
        if(fields != "" || !fields){
          const res = await this.saveTags(fields, user_id, 'field');
        }
        res.status(200).json({img})
      } catch (error) {
        console.log("'''''''''''''''''", error);
        res.status(500).json(error)
      }
      //¿qué tenemos que hacer? guardar los campos en la DB.
      //Guardar los datos normales (tabla user) y por otro las skills (tabla skills).
      //guardar en la tabla intermedia que usuario es con las skills
    }

    saveTags = async (data, user_id, type ) => {
        try {
        let name = 'skill_name'
        let id = 'skill_id' 
         if(type === 'field'){
          name = 'field_name'
          id = 'field_id'
         } 
       
       const dataArray = data.split(','); //si el string empieza en , o termina en , controlarlo
       let finalArrayData = dataArray.map(e => e.trim())
       let result = await userDal.saveTags(type, name, user_id, id, finalArrayData)
       return result;
      } catch (error) {
        throw error;
        
      }    
    }

      deleteUser = async(req, res) => {
        const {user_id} = req.params;
        try{
          await userDal.deleteUser(user_id)
          res.status(200).json("user disabled")
        }catch (error){
          res.status(500).json(error)
        }
      }

      getskillsfields = async (req,res) => {
        const {id} = req.body;
        try {
          const result = await userDal.getskillsfields(id);
          console.log(result);
          res.status(200).json(result)
        } catch (error) {
          res.status(500).json(error);
        }
      }


      requestResponse = async (req,res) => {
        const {user_id, project_id, offer_id}  = req.body;
        const values = [user_id, project_id, offer_id];
        console.log('HOliwis', user_id, project_id, offer_id)
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
        console.log('LLEGO')
        try {
           await userDal.updateRequestStatus(values, request_status,choose);
          
           
           res.status(200).json("ok")
        } catch (error) {
          console.log(error);          
          res.status(500).json(error)
        }
      }

      findUsersBySkills = async (req, res) => {
        const {skills,name} = req.body;
        try {
          const result = await userDal.findUsersBySkills(skills,name);
          res.status(200).json(result);
          
        } catch (error) {
          console.log('resultado', error)
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

      invite = async (req, res) => {
        const values = req.body;
                
        try {
          await userDal.invite(values);
          res.status(200).json('ok')
        } catch (error) {      
              res.status(500).json(error) 
        }
      }

      invitationResponse = async(req,res) => {
          const {invitation_id, user_id, project_id, offer_id ,invitation_status} = req.body;
          const values = {invitation_id, user_id, project_id, offer_id };
        try {
           await userDal.invitationResponse(values,invitation_status)
           res.status(200).json('ok')
        } catch (error) {
                 
           res.status(500).json(error) 
        }
      }
      
      allrequests = async() => {
        try {
          const {user_id} = req.body;
          const result = await userDal.allrequests(user_id);
          res.status(200).json(result);
        } catch (error) {
          res.status(500).json(error);
        }
      }

      managerequests = async(req,res) => {
        try {
          const {user_id} = req.body;
          const result = await userDal.managerequests(user_id);
          console.log('REQUESTS BACKKSIDE', result)
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



//meter trim en las validaciones de forms
