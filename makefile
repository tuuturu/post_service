run:
	mkdir -p static
	npm run serve

clean:
	@rm -rf node_modules
	@rm -rf static

create-dotenv-file:
	@echo "REDIS_URL=redis://localhost:6379" >> .env
