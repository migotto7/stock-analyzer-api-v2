import { Router } from "express";
import { getStock, searchSuggestionsList, searchTop10Stocks } from "../controllers/stock.controller.ts";
import { validateBody } from "../utils/validate-body.util.ts";
import { getUserFavorites, insertIntoUserFavorites } from "../controllers/user-favorites.controller.ts";
import { createUserFavorite } from "../schemas/favorites.schema.ts";

const router = Router()

router.get('/search/top', searchTop10Stocks)
router.get('/search/:query', searchSuggestionsList)
router.get('/:ticker', getStock)

export default router