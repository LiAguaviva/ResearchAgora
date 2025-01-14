import { hashPassword } from '../../utils/hashUtils.js';
import userDal from './user.dal.js'

class UserController {

  register = async (req, res) =>{
    
    
    try {
        const {email, password, repPassword} = req.body;
        if(!email||!password||!repPassword){
            throw new Error("All fields required") 
        }else if(password !== repPassword){
            throw new Error("Passwords mismatch")
        }else{
            const hash = await hashPassword(password)
            const result = await userDal.register([email, hash])          
            console.log("va bien", result);                 
            res.status(200).json({msg:"ok"})
        }
    } catch (error) {           
        console.log(error);        
        res.status(400).json(error.message)
    }
 }

}


export default new UserController();