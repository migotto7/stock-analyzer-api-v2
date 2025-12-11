import z, { string, uuid } from "zod";

export const createUserFavorite = z.object({
    userId: uuid(),
    ticker: string()
})