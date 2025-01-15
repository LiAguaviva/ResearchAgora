import { comparePassword, hashPassword } from "../../utils/hashUtils.js";
import userDal from "./user.dal.js";
import { registerSchema } from "../../schemas/registerSchema.js";
import { emailValidationToken, generateToken, getIdFromToken } from "../../utils/tokenUtils.js";
import { loginSchema } from "../../schemas/loginSchema.js";
import { sendMail } from "../../services/emailService.js";

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
        sendMail(email, token)
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



}

export default new UserController();
