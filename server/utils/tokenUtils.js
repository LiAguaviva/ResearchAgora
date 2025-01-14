import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (user_id) =>{
    let payLoad = {user_id}
    const token = jwt.sign(payLoad, process.env.TOKEN_KEY, {expiresIn: "1m"})
    return token
}

export const getIdFromToken = (token) =>{
    return jwt.decode(token).user_id
}