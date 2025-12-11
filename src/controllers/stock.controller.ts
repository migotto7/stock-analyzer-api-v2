import { fetchStockService, fetchTop10Stocks, getStockSuggestionsList } from "../services/fetch-stock.service.ts";
import {type Request, type Response} from 'express'

export async function getStock(req: Request, res: Response) {
    try {
        const ticker = req.params.ticker?.toUpperCase();
        
        if (!ticker) {
            return res.status(400).json({ error: "Ticker is required" });
        }

        const stock = await fetchStockService(ticker);

        return res.status(200).json(stock);
    } catch (err: any) {
        return res
            .status(500)
            .json({ error: err.message || "Internal server error" });
    }
}

export async function searchSuggestionsList(req: Request, res: Response) {
    try{    
        const querySearch = req.params.query?.toUpperCase()

        if(!querySearch) {
            return res.status(400).json({ error: "Query is required" });
        }

        const searchStocks = await getStockSuggestionsList(querySearch)

        return res.status(200).json(searchStocks)
    } catch(err: any) {
        return res
            .status(500)
            .json({ error: err.message || "Internal server error" });
    }
}

export async function searchTop10Stocks(req: Request, res: Response) {
    try {
        const top10Stocks = await fetchTop10Stocks()

        return res.status(200).json(top10Stocks)
    } catch (err: any) {
        return res
            .status(500)
            .json({ error: err.message || "Internal server error" });
    }
}