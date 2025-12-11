import { db } from "../database/client.ts";
import type { Request, Response } from "express";
import { userFavorites } from "../database/schema.ts";
import { and, eq } from "drizzle-orm";

export async function insertIntoUserFavorites(req: Request, res: Response) {
    try {
        const { userId, ticker } = req.body

        if (!userId || !ticker) {
            return res.status(400).send({
                message: "UserId and Ticker are required."
            })
        }

        const userHasFavorite = await db
            .select()
            .from(userFavorites)
            .where(
                and(
                    eq(userFavorites.userId, userId),
                    eq(userFavorites.ticker, ticker)
                )
            )
            .limit(1)

        if (userHasFavorite.length > 0) {
            return res.status(400).send({
                message: "Stock already on favorites list."
            })
        }

        await db.insert(userFavorites).values({
            userId,
            ticker
        })

        return res.status(201).send({
            message: "Favorite added successfully."
        })
    } catch (err: any) {
        return res
            .status(500)
            .json({ error: err.message || "Internal server error" });
    }
}

export async function getUserFavorites(req: Request, res: Response) {
    try {
        const userId  = req.params.userId

        const userFavoritesStocks = await db
            .select()
            .from(userFavorites)
            .where(eq(userFavorites.userId, userId))

        return res.status(200).json(userFavoritesStocks)
    } catch (err: any) {
        return res
            .status(500)
            .json({ error: err.message || "Internal server error" });
    }
}