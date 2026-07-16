import { Router } from "express";

const router = Router()

import { signup,signin,logout, checkAuth } from "../controllers/authController.js";
import { validateRegisterInput } from "../middlewares/validationMiddleware.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import upload from "../middlewares/upload.js";

router.post("/signup",upload.single("photo"),signup)
router.post("/signin",signin)
router.get("/logout",logout)
router.get("/check-auth",verifyToken,checkAuth)

export default router 