CREATE TABLE "transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"category" text NOT NULL,
	"amount" integer NOT NULL,
	"date" timestamp NOT NULL,
	"type" text NOT NULL,
	"icon" text,
	"user_id" integer NOT NULL,
	"description" text
);
--> statement-breakpoint
DROP TABLE "transaction" CASCADE;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;