import {Router} from "express"

const router = Router()

import { addLink,editLink,deleteLink,activateLink,deactivateLink,editInfos,getAllLinks, getInfos, reorderLinks, editPhoto } from "../controllers/adminController.js"
import { validateLinkInput, validateUpdateInfosInput } from "../middlewares/validationMiddleware.js"
import upload from "../middlewares/upload.js"

router.post("/add-link",validateLinkInput,addLink)
router.put("/edit-link/:id",validateLinkInput,editLink)
router.delete("/delete-link/:id",deleteLink)
router.patch("/activate-link/:id",activateLink)
router.patch("/deactivate-link/:id",deactivateLink)
router.put("/edit-infos",validateUpdateInfosInput,editInfos)
router.put("/edit-photo",upload.single("photo"),editPhoto)
router.get("/get-all-links",getAllLinks)
router.get("/get-infos",getInfos)
router.patch("/reorder-links",reorderLinks)

export default router 