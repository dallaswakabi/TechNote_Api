/*const mongoose = require('mongoose'); // Erase if already required
const AutoIncrement = require('mongoose-sequence')('mongoose')
// Declare the Schema of the Mongo model
const NoteSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    title:{
        type:String,
        required:true,
    },
    text:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
        default:false
    },
},{
    timestamps:true
});

NoteSchema.plugin(AutoIncrement,{
    inc_field:'ticket',
    id:'ticketNums',
    start_seq:500
})

//Export the model
module.exports = mongoose.model('Note', NoteSchema);

*/