import { BadRequestError,NotFoundError,UnauthorizedError} from "../errors/customError.js";
import Admin from '../models/adminModel.js'
import mongoose from 'mongoose'
import {body,validationResult,param} from 'express-validator'
import Link from '../models/linkModel.js'

export const withValidationsErrors = (validationValues) => {  //faut que j'ajoute des trucs 
    return [
        validationValues , 
        (req,res,next) => {
            const errors = validationResult(req)
             if(!errors.isEmpty()){
                const errorsMessages = errors.array().map((error)=>error.msg)
                if(errorsMessages[0].startsWith("no link")){
                    throw new NotFoundError(errorsMessages)
                }
                throw new BadRequestError (errorsMessage)
             }
             next()
        }
    ]
}

export const validateRegisterInput = withValidationsErrors([
    body("name").notEmpty().withMessage("name is required"),
    body("email").notEmpty().withMessage("email is required").isEmail().withMessage("wrong email format").custom(
        async (email)=>{
        const user = await Admin.findOne({email})
        if(user) {
            throw new BadRequestError("a user with this email already exists")
        }}),
    body("password").notEmpty().withMessage("password is required").isLength({min:8}).withMessage("password must be at least 8 characters long"),
    body("bio").notEmpty().withMessage("bio is required").isLength({max:200}).withMessage("bio must not exceed 200 characters")
])

export const validateIdParam = withValidationsErrors([
    param("id").custom(async(value,{req})=>{
        if(! mongoose.Types.ObjectId(value)){
            throw new BadRequestError ("invalid mongodb id")
        }
        const link = await Link.findById(value)
        if(!link){
            throw new NotFoundError ("no link found with this id")
        }
        const isOwner = req.user.userId === link.createdBy.toString()
        if (!isOwner) {
            throw new UnauthorizedError ("no permission to access this route")
        }
        return true 
    })
])

export const validateLinkInput = withValidationsErrors([
    body("title").notEmpty().withMessage("title is required"),
    body("dest").notEmpty().withMessage("link is required").isURL().withMessage("wrong url format")
])

export const validateUpdateInfosInput = withValidationsErrors([
    body("name").optional().notEmpty().withMessage("name cannot be empty"),
    body("bio").optional().isLength({max:200}).withMessage("bio cannot be empty")
    //body("photo").optional()
])

