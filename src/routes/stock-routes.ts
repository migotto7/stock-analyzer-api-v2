import { Router } from "express";
import { getStock, searchSuggestionsList, searchTop10Stocks } from "../controllers/stockController.ts";

const router = Router()

router.get('/search/top', searchTop10Stocks)
router.get('/search/:query', searchSuggestionsList)
router.get('/:ticker', getStock)

export default router