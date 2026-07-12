import Admin from "../models/adminModel.js";
import { StatusCodes } from "http-status-codes";
import Link from "../models/linkModel.js"

export const addLink = async (req,res) => {
  req.body.createdBy = req.user.userId
  const link = await Link.create(req.body)
  res.status(StatusCodes.CREATED).json({msg:'link added successfully',link})
}

export const editLink = async (req,res) => {
  const {id} = req.params 
  const {title,dest} = req.body 
  const updatedLink = await Link.findByIdAndUpdate(id,{title,dest},{new:true})
  res.status(StatusCodes.OK).json({msg:'link edited successfully',updatedLink})
  }

export const deleteLink = async (req,res) => {
 const {id} = req.params 
 const deletedLink = await Link.findByIdAndDelete(id)
 res.status(StatusCodes.OK).json({msg:'link deleted successfully',id})
}

export const deactivateLink = async(req,res) => {
  const {id} = req.params
  const deactivatedLink = await Link.findById(id)
   if(!deactivatedLink){
    return res.status(StatusCodes.NOT_FOUND).json({msg: "Link not found"})
  }
  deactivatedLink.active = false 
  await deactivatedLink.save()
  res.status(StatusCodes.OK).json({msg:'link deactivated',deactivatedLink})
}

export const activateLink = async(req,res)=>{
  const {id} = req.params
  const activatedLink = await Link.findById(id)
  activatedLink.active = true 
  await activatedLink.save()
  res.status(StatusCodes.OK).json({msg:'link activated',activatedLink})}


export const getAllLinks = async (req,res) => {
 const links = await Link.find({createdBy:req.user.userId})
res.status(StatusCodes.OK).json({msg:'links retrieved', links})
}

export const editInfos = async (req,res) => {
  const adminId = req.user.userId
  if(!adminId){
    return res.status(StatusCodes.NOT_FOUND).json({msg:'user not found'})
  }
  const {name,photo,bio } = req.body 
  const updatedInfosAdmin = await Admin.findByIdAndUpdate(adminId,{name,photo,bio},{new:true}).select('-password')
  res.status(StatusCodes.OK).json({msg:'user infos updated',updatedInfosAdmin})
}

export const getInfos = async (req,res) => {   
  const id = req.user.userId
  const user = await Admin.findById(id)
  res.status(StatusCodes.OK).json({msg:'infos retrieved',user})
}

export const getAllUsers = async (req,res) => {   
  const users = await Admin.find({}).select('-password')
  res.status(StatusCodes.OK).json({msg:'users retrieved',users})
}