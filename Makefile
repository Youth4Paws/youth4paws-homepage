.PHONY: run build docker

run:
	bun run prepare
	bunx drizzle-kit push
	bun run --bun dev

build:
	bun run --bun build

generate:
	bunx drizzle-kit generate

migrate:
	bunx drizzle-kit migrate

init:
	mkdir -p /srn/paws/postgres
	bun install
	cd .. && docker compose up -d postgres
	bunx drizzle-kit migrate

docker:
	docker compose build --no-cache
	docker compose up -d

prod:
	git stash -u
	git pull
	git stash apply || true
	$(MAKE) docker
