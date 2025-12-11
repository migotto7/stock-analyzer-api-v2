import { pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password_hash").notNull(),
})

export const userFavorites = pgTable('user_favorites', {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => users.id).notNull(),
    ticker: text("ticker").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
},
    (table) => ({
        userFavoritesUnique: unique().on(table.userId, table.ticker)
    })
)
