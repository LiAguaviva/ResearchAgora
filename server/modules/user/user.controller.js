import { hashPassword } from '../../utils/hashUtils.js';
import userDal from './user.dal.js'
import {registerSchema} from '../../schemas/registerSchema.js'


class UserController {

  register = async (req, res) =>{
    try {
        const {email, password, repPassword} = registerSchema.parse(req.body);
         if(password !== repPassword){
            throw new Error("Passwords mismatch")
        }else{
            const hash = await hashPassword(password)
            await userDal.register([email, hash])                                 
            res.status(200).json({msg:"ok"})
        }
    } catch (error) {                 
        res.status(400).json(error.message)
    }
  }




}


export default new UserController();