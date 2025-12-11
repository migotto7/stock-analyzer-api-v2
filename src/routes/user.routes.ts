import { Router } from "express"
import { getUserFavorites, insertIntoUserFavorites } from "../controllers/user-favorites.controller.ts"
import { createUserFavorite } from "../schemas/favorites.schema.ts"
import { validateBody } from "../utils/validate-body.util.ts"
import { checkRequestJwt } from "./hooks/check-request-jwt.ts"

const router = Router()

router.get('/favorites/:userId', checkRequestJwt, getUserFavorites)
router.post('/favorites', checkRequestJwt, validateBody(createUserFavorite), insertIntoUserFavorites)

export default router