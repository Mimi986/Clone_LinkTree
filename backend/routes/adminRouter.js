import {Router} from "express"

const router = Router()

import { addLink,editLink,deleteLink,activateLink,deactivateLink,editInfos,getAllLinks, getInfos } from "../controllers/adminController.js"
import { validateLinkInput } from "../middlewares/validationMiddleware.js"

router.post("/add-link",validateLinkInput,addLink)
router.put("/edit-link/:id",editLink)
router.delete("/delete-link/:id",deleteLink)
router.patch("/activate-link/:id",activateLink)
router.patch("/deactivate-link/:id",deactivateLink)
router.put("/edit-infos",editInfos)
router.get("/get-all-links",getAllLinks)
router.get("/get-infos",getInfos)

export default router 