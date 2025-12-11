import { Router } from "express";
import { loginController } from "../controllers/login.controller.ts";
import { signInController } from "../controllers/signin.controller.ts";
import { validateBody } from "../utils/validate-body.util.ts";
import { createUserSchema, getUserSchema } from "../schemas/user.schema.ts";

const router = Router()

router.post("/login", validateBody(getUserSchema), loginController)
router.post("/register", validateBody(createUserSchema), signInController)

export default router