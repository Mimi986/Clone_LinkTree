import { Router } from "express";

const router = Router()

import { signup,signin,logout } from "../controllers/authController.js";
import { validateRegisterInput } from "../middlewares/validationMiddleware.js";

router.post("/signup",validateRegisterInput,signup)
router.get("/signin",signin)
router.get("/logout",logout)

export default router 