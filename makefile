NAME=`cat package.json | jq .name | cut -d"\"" -f2`
VERSION=`cat package.json | jq .version | cut -d"\"" -f2`
REPOSITORY=docker.pkg.github.com

help: ## Print this menu
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

build: ## Build Docker image
	@echo "🏗 Building ${REPOSITORY}/${NAME}:${VERSION}"
	docker build \
		--tag ${REPOSITORY}/${NAME}:${VERSION} \
		--tag ${REPOSITORY}/${NAME}:latest \
		.
	@echo "👷‍ ‍Build complete"

push-image:
	@echo "🚚 Pushing image to ${REPOSITORY}"
	docker push ${REPOSITORY}/${NAME}:${VERSION}
	@echo "🛬 Push complete"

release: build push-image
	@echo "🚀 Release successfully built. We are ready to deploy"

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
	@echo "LOG_LEVEL=info" >> .env
