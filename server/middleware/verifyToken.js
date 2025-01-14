import jwt from 'jsonwebtoken';



export const tokenVerify = (req, res, next) =>{
    const tokenBearer = req.headers.authorization;
    
    if(!tokenBearer){
        res.status(401).json({message: "not authorized"})
    }else{
        let token = tokenBearer.split(" ")[1]
        jwt.verify(token, process.env.TOKEN_KEY, (err)=>{
            if(err){
                res.status(401).json({message: "not authorized"})
            }else{
                req.token = token;
                next();
            }
        } )
    }
}