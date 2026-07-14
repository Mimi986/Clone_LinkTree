import Admin from "../models/adminModel.js";
import bcryptjs from "bcryptjs"
import crypto from "crypto"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { BadRequestError,UnauthenticatedError} from "../errors/customError.js";
import { StatusCodes } from "http-status-codes";

export const signup = async (req,res) => {
const {name,email,password,photo,bio} = req.body 
const adminAlreadyExists = await Admin.findOne({email})
if(adminAlreadyExists) throw new BadRequestError('a user with this email already exists')
    const hashedPassword = await bcryptjs.hash(password,10)
    const admin = new Admin({
    name,
    email,
    password:hashedPassword,
    photo,
    bio
})
    await admin.save()
    generateTokenAndSetCookie(res,admin._id)
    const { hidePassword, ...userWithoutPassword } = admin.toObject();
    res.status(StatusCodes.CREATED).json({msg:"user created successfully",admin:userWithoutPassword})}

export const signin = async (req,res) => {
    const {email,password} = req.body
    const admin = await Admin.findOne({email})
    if(!admin) throw new UnauthenticatedError("invalid credentials")
        const isMatch = await bcryptjs.compare(password,admin.password)
        if(!isMatch) throw new UnauthenticatedError("invalid credentials")
        generateTokenAndSetCookie(res,admin._id)
        const { password:_, ...userWithoutPassword } = admin.toObject();
        res.status(StatusCodes.OK).json({msg:'logged in successfully',admin:userWithoutPassword})
}

export const logout = async(req,res) => {
    res.clearCookie("token")
    res.status(StatusCodes.OK).json({msg:'logged out successfully'})
}

export const checkAuth = async(req,res) => {
    try {
        const user = await Admin.findById(req.userId).select("-password")
        if(!user) throw new BadRequestError("user not found")
        res.status(StatusCodes.OK).json({msg:"authenticated",user})  
    } catch (error) {
        console.log("error in check auth",error)
        throw new UnauthenticatedError ("error in checkauth")
    }
}