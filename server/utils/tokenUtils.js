import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (user_id) =>{
    let payLoad = {user_id}
    const token = jwt.sign(payLoad, process.env.TOKEN_KEY, {expiresIn: "5d"})
    return token
}

export const getIdFromToken = (token) =>{
    return jwt.decode(token).user_id
}

export const emailValidationToken = (user_id) =>{
    let payLoad = {user_id}
    const token = jwt.sign(payLoad, process.env.VALIDATION_KEY, {expiresIn: "3d"})
    return token
}

export const forgottenPasswordToken = (user_id) =>{
    let payLoad = {user_id}
    const token = jwt.sign(payLoad, process.env.PASSWORD_KEY, {expiresIn: "3d"})
    return token
}