const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel.js');
const Note = require('../models/NoteModel.js')

//@desc Get all Users
//@route Get /User
//@access Private

const getAllUser = asyncHandler(async(req,res)=>{
    const users = await User.find()

    if(!users){
        return res.status(400).json({message:'User Not Found'})
    }
    res.status(201).json(users);

});


//@desc Get all Users
//@route Get /User
//@access Private

const createNewUser = asyncHandler(async(req,res)=>{
   const {username,password,roles} = req.body;
    console.log(username,password,roles)
   // confirm Value 
    if(!username || !password ){
        return res.status(400).json({message:'All Filed Required'})
    }
   // check for duplicate 
    const duplicate = await User.findOne({username})
      
    if(duplicate){
        return res.status(409).json({message:'Username Duplicated'})
    }
   // Hash Password 
    const salt = await bcrypt.genSalt(10);
    const Hashpassword = await bcrypt.hash(password,salt);
    
    const createObject = {username,"password":Hashpassword,roles};
   
    const user =  await User.create(createObject)
    
})

//@desc Update User
//@route Patch / users
//@access Private

const updateUser = asyncHandler(async(req,res)=>{
    const {id,username,roles,active,password} = req.body;
    //confirm data
    if(!id || !username || !Array.isArray(roles) || !roles.length || !password || 
    typeof active !== 'boolean'){
      return res.status(400).json({message:'All Field are required'})
    }
     // find User And Update
    const user = await User.findById(id)
    if(!user){
    res.status(400).json({message:'User Not Found'});
    }
    // check For duplicated
    const duplicated = await User.findOne({username})
    // Allow To the update the original user
    if(duplicated && duplicated?._id.toString() !== id){
        return res.status(409).json({message:'duplicate Username'});
    }

    user.username = username
    user.roles = roles
    user.active = active

    if(password){
        // Hash Password 
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password,salt);
    }
    const updateduser  = await user.save();
    res.json({message:`${updateduser.username} updated `}) 
})

//@desc Delete User
//@route delete / users
//@access Private

const DeleteUser = asyncHandler(async(req,res)=>{
    const {id} = req.body;
   // confirm id if it has value
   if(!id){
    return res.status(400).json({message:'Id required !'})
   }
   // check id if exist in Note means notes has value
   
   const notes = await Note.findOne({user:id})
   if(notes?.length){
    return res.status(400).json({message:'User Has Assigned Notes'})
   }
   // find User Id 
   const user = await User.findById(id)
   if(!user){
    return res.status(400).json({message:'User Not Found'});
   } 
  const result = await User.deleteOne()
  const reply = `Username ${user.username} with ID ${result._id} deleted`
  
  res.json(reply)
})


module.exports = {
    getAllUser,
    updateUser,
    DeleteUser,
    createNewUser
}