.PHONY: run build

run:
	bunx drizzle-kit push
	bun run --bun dev

build: migrate
	bunx drizzle-kit migrate
	bun run --bun build

generate:
	bunx drizzle-kit generate