const asyncHandler = require('express-async-handler');
//const User = require('../models/UserModel.js');
const Note = require('../models/NoteModel.js')



//@desc View All Note /notes
//@route Get /notes
//@access Private


const ViewNotes = asyncHandler(async(req,res)=>{

  const allNotes = await Note.find({})
     if(allNotes){
      res.status(200).json({allNotes})
     } else{
      res.status(400).json({
        message:'There is No Note Yet ?'
      })
     }
})


//@desc Create Note /notes
//@route Post /notes
//@access Private

const createNote = asyncHandler(async(req,res)=>{
    const {title,text,complete} = req.body;
    // confirm input value
   if(!title || !text || typeof complete !== 'boolean'){
    return res.status(400).json({message:'All Fields Required'})
   }
    // check notes if completed or Open
    if(complete === true){
      return res.status(400).json({message:'Note Are Completed'})
    }
  const note = await Note.create({title,text});
  if(note){
    res.status(201).json({message:'Note Created Well!'})
  }else{
    res.status(400).json({message:'Note has Not Created '})
  }
})

//@desc Update Note /notes
//@route Patch /notes
//@access Private

const UpdateNote = asyncHandler(async(req,res)=>{
    const {id,text} = req.body;
    //check if note exist 
   const ExistNote = await Note.findById({user:id})
   if(!ExistNote){
    return res.status(400).json({message:'There Is No Notes To Update'})
   }
    // check if note is complete or Open
    if(ExistNote.complete === true){
        return res.status(400).json({message:'Note Completed'})
    }
    const update = await Note.findByIdAndUpdate(id,{text},{new:true,useFindAndModify:false})
    if(update){
        res.status(200).json({message:'Note Updated'})
    }else{
        res.status(400).json({message:'Note not Updated '})
    }
})

module.exports={
    UpdateNote,
    createNote,
    ViewNotes
}
