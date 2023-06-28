const jwt = require('jsonwebtoken')

const verifyJwt = (req,res,next)=>{
   const authHeader = req.headers.authorization || req.headers.Authorization
  
     if(!authHeader?.startsWith('Bearer ')){
       return res.status(401).json({message:'Unauthorized'})
     }

    const Token = authHeader.split(' ')[1]

     jwt.verify(Token,process.env.ACCESS_TOKEN_SECRET,(err,decode)=>{
        if(err) return res.status(401).json({message:'UnAuthorized'})
         req.user = decode.userInfo.username
         req.roles = decode.userInfo.roles
         next()
     })

}

module.exports = verifyJwt
