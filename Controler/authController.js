const User = require('../models/UserModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


const login = asyncHandler(async(req,res)=>{
    const {username,password} = req.body
      console.log(username,password);
    if (!username || !password){
        res.status(400).json({message:'All Fields required !'})
    }
     
    const foundUser  = await User.findOne({username})

    if(!foundUser || !foundUser.active){
        res.status(400).json({message:'Username Not Found '})
    }
    const checkPass = await bcrypt.compare(password,foundUser.password)

    if(!checkPass){
        res.status(400).json({message:'Password Does not match'})
    }
    const accessToken = jwt.sign({
        "userInfo":{
            "username":foundUser.username,
            "roles":foundUser.roles
        }
    }, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'})


 const refreshToken =  jwt.sign({
    "userInfo":{
        "username":foundUser.username,
    }
}, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'7d'})

res.cookie('jwt',refreshToken,{
    httpOnly:true,
    secure:'true',
    sameSite:'none',
    maxAge:7 * 24 * 60 * 60 * 1000
})
  
  res.json({accessToken})
})

const refresh = asyncHandler(async(req,res)=>{
  const cookie = req.cookies
  if(!cookie?.jwt) return res.status(401).json({message:'unauthorized'})
    
   const refreshToken = cookie.jwt 

   jwt.verify(refreshToken,process.env.ACCESS_TOKEN_SECRET,asyncHandler(async(err,decode)=>{
     if(err) return res.status(403).json({message:'Forbidden'})
     const foundUser = await User.findOne({username:decode.username})
     if(!foundUser) return res.status(401).json({message:'unAuthorized'})
     const accessToken = jwt.sign({
        "userInfo":{
            "username":foundUser.username,
            "roles":foundUser.roles
        }
     },process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'})

     res.json({accessToken})
   }))
   
})

const logout = asyncHandler(async(req,res)=>{
    const cookie = req.cookies
    if(!cookie?.jwt) return res.sendStatus(204)
    res.clearCookie('jwt',{httpOnly:true,secure:true,sameSite:'none'})
    res.json({message:'Cookie Cleared'})    
})

module.exports ={
    login,
    refresh,
    logout
}