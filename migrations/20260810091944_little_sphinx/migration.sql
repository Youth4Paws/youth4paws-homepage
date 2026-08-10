ALTER TABLE "users" DROP CONSTRAINT "users_name_key";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_email_key";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "oidcSubject" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "password";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_oidcSubject_key" UNIQUE("oidcSubject");