import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    email: text().notNull().unique(),
    password: text().notNull(),
})

export const userFavorites = pgTable('user_favorites', {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid().references(() => users.id).notNull(),
    ticker: text().notNull(),
    createdAt: timestamp().defaultNow().notNull()
})
