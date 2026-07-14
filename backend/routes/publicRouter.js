import { Router } from "express";

const router = Router()

import { getUserWithLinks } from "../controllers/adminController.js";

router.get("/get-user-with-links",getUserWithLinks)

export default router 