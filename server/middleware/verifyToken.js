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


export const tokenVerifyEmail = (req, res, next) =>{
    const {token} = req.params;
    console.log(token);
    
     jwt.verify(token, process.env.VALIDATION_KEY, (err)=>{
        if(err){
            res.status(401).json({message: "not authorized"})
        }else{
            req.token = token;
            next();
            }
        } )

}

export const forgottenPasswordEmail = (req, res, next) =>{
    const {token} = req.params;
    console.log("token forgotten password", token);
    
     jwt.verify(token, process.env.PASSWORD_KEY, (err)=>{
        console.log("middleware", err);
        
        if(err){
                    
            res.status(401).json({message: "not authorized"})
        }else{
            req.token = token;
            next();
            }
        } )

}