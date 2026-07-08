import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    title:String,
    dest:String,
    globe:{
        type:String,
        default:'generic'
    },
    active:{
        type:Boolean,
        default:true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"Admin"
    }
})

export default mongoose.model("Link",linkSchema) 