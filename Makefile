.PHONY: dev, down, restart, build, up, prod

dev:
	docker compose up -d --build

down:
	docker compose down

restart:
	docker compose restart

build:
	docker compose build --no-cache

up:
	docker compose up -d

prod:
	git stash -u
	git pull
	git stash apply || true
	$(MAKE) build
	$(MAKE) up
