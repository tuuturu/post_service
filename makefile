run:
	mkdir -p static
	npm run serve

start-redis:
	@docker run --rm -p 6379:6379 --name redis -d redis

clean:
	@rm -rf node_modules
	@rm -rf static

create-dotenv-file:
	@echo "REDIS_URL=redis://localhost:6379" >> .env
