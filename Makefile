.PHONY: reinstall

npm reinstall:
	rm -rf node_modules
	rm package-lock.json
	npm install

docker watch:
	docker compose -f docker-compose.server.yml watch
