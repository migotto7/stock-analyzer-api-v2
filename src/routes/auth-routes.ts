import { Router } from "express";
import { loginController } from "../controllers/login-controller.ts";
import { signInController } from "../controllers/signin-controller.ts";

const router = Router()

router.post("/login", loginController)
router.post("/register", signInController)

export default router