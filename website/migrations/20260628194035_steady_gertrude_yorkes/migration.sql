CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(32) NOT NULL UNIQUE,
	"email" varchar(128) NOT NULL UNIQUE,
	"password" varchar(256) NOT NULL,
	"active" boolean
);
