CREATE TYPE "permission" AS ENUM('manage_users', 'manage_content', 'admin');--> statement-breakpoint
CREATE TABLE "permissions" (
	"userId" uuid,
	"permission" "permission",
	CONSTRAINT "permissions_pkey" PRIMARY KEY("userId","permission")
);
--> statement-breakpoint
ALTER TABLE "permissions" DROP CONSTRAINT "permissions_userId_users_id_fkey";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "id";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "id" uuid PRIMARY KEY GENERATED ALWAYS AS (gen_random_uuid()) STORED;--> statement-breakpoint
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_userId_users_id_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_userId_users_id_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;