import z from "zod";

const historicalPriceItemSchema = z.object({
  date: z.number(),
  open: z.number(),
  high: z.number(),
  low: z.number(),
  close: z.number(),
  volume: z.number(),
  adjustedClose: z.number(),
});

export const stockCompleteSchema = z.object({
  currency: z.string(),
  marketCap: z.number(),
  shortName: z.string(),
  longName: z.string(),
  regularMarketChange: z.number(),
  regularMarketChangePercent: z.number(),
  regularMarketTime: z.string(), // pode ser transformado em Date depois
  regularMarketPrice: z.number(),
  regularMarketDayHigh: z.number(),
  regularMarketDayRange: z.string(),
  regularMarketDayLow: z.number(),
  regularMarketVolume: z.number(),
  regularMarketPreviousClose: z.number(),
  regularMarketOpen: z.number(),
  fiftyTwoWeekRange: z.string(),
  fiftyTwoWeekLow: z.number(),
  fiftyTwoWeekHigh: z.number(),
  symbol: z.string(),
  logourl: z.string(),
  usedInterval: z.string(),
  usedRange: z.string(),
  historicalDataPrice: z.array(historicalPriceItemSchema),
  validRanges: z.array(z.string()),
  validIntervals: z.array(z.string()),
  priceEarnings: z.number(),
  earningsPerShare: z.number(),
});

export const stockResponseSchema = z.object({
  results: z.array(stockCompleteSchema),
  requestedAt: z.string(),
  took: z.number(),
});

export const StockResponseErrorSchema = z.object({
  error: z.boolean(),
  message: z.string()
})

export type StockResponseSchemaType = z.infer<typeof stockResponseSchema>
export type StockResponseErrorSchemaType = z.infer<typeof StockResponseErrorSchema>