ALTER TABLE "transaction" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "clerk_user_id" text;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_clerk_user_id_unique" UNIQUE("clerk_user_id");--> statement-breakpoint
DROP TYPE "public"."transaction_type";