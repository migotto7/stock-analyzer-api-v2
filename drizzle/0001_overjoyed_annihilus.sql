ALTER TABLE "user_favorites" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "user_favorites" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "password" TO "password_hash";--> statement-breakpoint
ALTER TABLE "user_favorites" DROP CONSTRAINT "user_favorites_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_user_id_ticker_unique" UNIQUE("user_id","ticker");