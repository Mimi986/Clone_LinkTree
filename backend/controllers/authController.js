import Admin from "../models/adminModel.js";
import bcryptjs from "bcryptjs"
import crypto from "crypto"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { BadRequestError,UnauthenticatedError} from "../errors/customError.js";
import { StatusCodes } from "http-status-codes";

//rajouter checkAuth 

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
    res.status(StatusCodes.CREATED).json({msg:"user created successfully"})}

export const signin = async (req,res) => {
    const {email,password} = req.body
    const admin = await Admin.findOne({email})
    if(!admin) throw new UnauthenticatedError("invalid credentials")
        const hashedPassword = await bcryptjs.hash(password,10)
        const isMatch = await bcryptjs.compare(password,hashedPassword)
        if(!isMatch) throw new UnauthenticatedError("invalid credentials")
        generateTokenAndSetCookie(res,admin._id)
        res.status(StatusCodes.CREATED).json({msg:'logged in successfully'})
}

export const logout = async(req,res) => {
    res.clearCookie("token")
    res.status(StatusCodes.Ok).json({msg:'logged out successfully'})
}