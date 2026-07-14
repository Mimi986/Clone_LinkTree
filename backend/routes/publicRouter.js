import { Router } from "express";

const router = Router()

import { getUserLinksPublic } from "../controllers/adminController.js";

router.get("/get-user-links-public/:name",getUserLinksPublic)

export default router 