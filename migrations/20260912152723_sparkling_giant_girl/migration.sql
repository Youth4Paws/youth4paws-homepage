CREATE TABLE "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"uploader" uuid,
	"uploadDate" timestamp DEFAULT now() NOT NULL,
	"public" boolean DEFAULT true,
	"originalName" varchar(128) NOT NULL,
	"extension" varchar(16),
	"hash" bytea NOT NULL,
	"content" bytea NOT NULL
);
--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_uploader_users_id_fkey" FOREIGN KEY ("uploader") REFERENCES "users"("id") ON DELETE SET NULL;