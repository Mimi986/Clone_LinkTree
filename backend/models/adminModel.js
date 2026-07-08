import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:'default_pdp_user.jpg'
    },
    bio:{
        type:String,
        required:true,
        maxlength:200
    },
})

export default mongoose.model("Admin",adminSchema)