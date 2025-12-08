import { stockResponseSchema } from "../schemas/stockSchema.ts";
import { stocksArraySuggetionsSchema } from "../schemas/suggetionsStockSchema.ts";

export async function fetchStockService(ticker: string) {
    const url = `https://brapi.dev/api/quote/${ticker}?token=${process.env.BRAPI_KEY}&fundamental=true&range=1mo&interval=1d`
    const stockResponse = await fetch(url)

    const data: any = await stockResponse.json();
    console.log("data", data)
    if(data.error == true) {
        throw new Error(data.message)
    }

    const parsed = stockResponseSchema.safeParse(data)

    if (!parsed.success) {
        console.error(parsed.error)
        throw new Error("Invalid API external response")
    }

    return parsed.data.results[0]
}

export async function getStockSuggestionsList(query: string) {
    const url = `https://brapi.dev/api/quote/list?search=${query}&token=${process.env.BRAPI_KEY}&type=stock`
    const getStockSuggestionResult = await fetch(url)

    const data = await getStockSuggestionResult.json() as { stocks: unknown }

    const parsed = stocksArraySuggetionsSchema.safeParse(data.stocks)

    if (!parsed.success) {
        console.error(parsed.error);
        throw new Error("Invalid stocks data from external API");
    }

    return parsed.data
}

export async function fetchTop10Stocks() {
    const url = `https://brapi.dev/api/quote/list?type=stock&sortBy=volume&sortOrder=desc&limit=20&page=1&token=${process.env.BRAPI_KEY}`
    const getTop10Stocks = await fetch(url)
    const data = await getTop10Stocks.json() as { stocks: unknown }

    const parsed = stocksArraySuggetionsSchema.safeParse(data.stocks)

    if (!parsed.success) {
        console.error(parsed.error);
        throw new Error("Invalid stocks data from external API");
    }

    return parsed.data
}