.PHONY: run build

run:
	bunx drizzle-kit push
	bun run --bun dev

build: migrate
	bun run --bun build

generate:
	bunx drizzle-kit generate

migrate:
	bunx drizzle-kit migrate

init:
	bun install
	cd .. && docker compose up -d youth4paws-postgres
	bunx drizzle-kit migrate