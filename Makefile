.PHONY: reinstall

npm reinstall:
	rm -rf node_modules
	rm package-lock.json
	pnpm install

docker watch:
	docker compose -f docker-compose.server.yml watch
