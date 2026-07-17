import Admin from "../models/adminModel.js";
import { StatusCodes } from "http-status-codes";
import Link from "../models/linkModel.js"
import { BadRequestError, NotFoundError } from "../errors/customError.js";

export const addLink = async (req,res) => {
   const { title, dest } = req.body
  const createdBy = req.user.userId
  const count = await Admin.countDocuments({user:req.user.userId})
  const link = await Link.create({
    title,
    dest,
    createdBy,
    position:count
  })
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
   if(!deactivatedLink) throw new BadRequestError("link not found")
  deactivatedLink.active = false 
  await deactivatedLink.save()
  res.status(StatusCodes.OK).json({msg:'link deactivated',deactivatedLink})
}

export const activateLink = async(req,res)=>{
  const {id} = req.params
  const activatedLink = await Link.findById(id)
   if(!activatedLink) throw new BadRequestError("link not found")
  activatedLink.active = true 
  await activatedLink.save()
  res.status(StatusCodes.OK).json({msg:'link activated',activatedLink})}


export const getAllLinks = async (req,res) => {
 const links = await Link.find({createdBy:req.user.userId})
res.status(StatusCodes.OK).json({msg:'links retrieved', links})
}

export const editInfos = async (req,res) => {
  const adminId = req.user.userId
  if(!adminId) throw new BadRequestError("user not found")
  const {name,photo,bio } = req.body 
  const updatedInfosAdmin = await Admin.findByIdAndUpdate(adminId,{name,photo,bio},{new:true}).select('-password')
  res.status(StatusCodes.OK).json({msg:'user infos updated',updatedInfosAdmin})
}

export const getInfos = async (req,res) => {   
  const id = req.user.userId
  const user = await Admin.findById(id)
   if(!user) throw new NotFoundError("user not found")
  res.status(StatusCodes.OK).json({msg:'infos retrieved',user})
}

export const getUserLinksPublic = async(req,res)=>{
  const {name} = req.params
  const user = await Admin.findOne({name}).select('-password') 
  if(!user) throw new NotFoundError("user not found")
  const links = await Link.find({createdBy:user._id,active:true})
  res.status(StatusCodes.OK).json({msg:'user retrieved',user,links})
}

export const reorderLinks = async(req,res) => {
  const {orderedLinks} = req.body 
  const newlyOrderedLinks = orderedLinks.map((link,index)=>({
    updateOne:{
      filter:{ _id:link._id},
      update:{position:index}
    }
  }))
  await Link.bulkWrite(newlyOrderedLinks)
  res.status(StatusCodes.OK).json({msg:'links reordered successfully'})
  }
