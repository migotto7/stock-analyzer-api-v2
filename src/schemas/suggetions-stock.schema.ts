import z from 'zod'

export const stockItemSchema = z.object({
  stock: z.string(),                     
  name: z.string(),                      
  close: z.number(),                    
  change: z.number(),                   
  volume: z.number(),                   
  market_cap: z.number(),                
  logo: z.string(),                
  sector: z.string(),                     
  type: z.enum(["stock", "fund", "bdr"])
});

export const stocksArraySuggetionsSchema = z.array(stockItemSchema)

export type StocksArray = z.infer<typeof stocksArraySuggetionsSchema>
export type StockItem = z.infer<typeof stockItemSchema>