import { comparePassword, hashPassword } from "../../utils/hashUtils.js";
import userDal from "./user.dal.js";
import { registerSchema } from "../../schemas/registerSchema.js";
import { emailValidationToken, generateToken, getIdFromToken } from "../../utils/tokenUtils.js";
import { loginSchema } from "../../schemas/loginSchema.js";
import { sendMailValidation } from "../../services/emailService.js";


class UserController {
  register = async (req, res) => {
    try {
      const { email, password, repPassword } = registerSchema.parse(req.body);
      if (password !== repPassword) {
        throw new Error("Passwords mismatch");
      } else {
        const hash = await hashPassword(password);
        const result = await userDal.register([email, hash]);
        const token = await emailValidationToken(result.insertId)
        // console.log("0000000000000000000", token);
        sendMailValidation(email, token)
        res.status(200).json({ msg: "ok" });
      }
    } catch (error) {
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


    findUserById = async (req, res) => {
      const id = getIdFromToken(req.token)
      console.log("Id", id);
      const user = await userDal.getUserById(id)
      console.log("usssssssssser", user);
      
      let userData ={}
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
      })

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
    }

    res.status(200).json(userData)  




    }



}

export default new UserController();
