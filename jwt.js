const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtauth = (req,res,next)=>{
      const Authorization = req.headers.authorization
    if (!Authorization) {
        return  res.status(401).json({error:"token not found"})
    }


    const token = Authorization.split(" ")[1];
    console.log(token);
    
    if (!token){
        return res.status(401).json({message:"Token Not Found"});
    }
    try {
        const verify =  jwt.verify(token,process.env.SECRET_KEY)
        req.Userpayload = verify;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}


const generatetoken = (userdata)=>{
 return jwt.sign(userdata,process.env.SECRET_KEY,{expiresIn:'1h'})
}



module.exports={jwtauth,generatetoken};