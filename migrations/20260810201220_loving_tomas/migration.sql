ALTER TABLE "permissions" ALTER COLUMN "permission" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "permission";--> statement-breakpoint
CREATE TYPE "permission" AS ENUM('manage_users', 'manage_content', 'developer', 'admin');--> statement-breakpoint
ALTER TABLE "permissions" ALTER COLUMN "permission" SET DATA TYPE "permission" USING "permission"::"permission";