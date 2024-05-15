DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('systemdefined', 'userdefined');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chatpdf" (
	"id" serial PRIMARY KEY NOT NULL,
	"pdf_name" text NOT NULL,
	"pdf_url" text NOT NULL,
	"created_At" timestamp DEFAULT now() NOT NULL,
	"file_key" text NOT NULL,
	"user_id" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"chat_id" integer NOT NULL,
	"content" text NOT NULL,
	"created_At" timestamp DEFAULT now() NOT NULL,
	"role" "role" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text,
	"phone" varchar(256)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_chatpdf_id_fk" FOREIGN KEY ("chat_id") REFERENCES "chatpdf"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
