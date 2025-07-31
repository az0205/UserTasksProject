const mongoose=require("mongoose")
const { Schema } = mongoose;
const taskSchema=new mongoose.Schema({
    description:{
        type:String,
        required:"true"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})
const Task=mongoose.model("Task",taskSchema)
module.exports=Task