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

run: start-dependencies
	npm run serve

start-dependencies:
	@COMPOSE_PROJECT_NAME=motoblog docker-compose up -d

clean:
	@rm -rf node_modules
	@rm -rf static

create-dotenv-file:
	$(eval LOCALHOST := $(or $(shell ip addr show docker0 | grep -Po 'inet \K[\d.]+'), $(shell echo "host.docker.internal")))
	@echo "REDIS_URL=redis://localhost:6379" >> .env
	@echo "LOG_LEVEL=info" >> .env
	@echo "GATEKEEPER_URL=http://localhost:4554" >> .env
	@echo "MINIO_URL=http://localhost:9000" >> .env
	@echo "MINIO_ACCESS_KEY=X4TO2JNMO05VC0B1AMHU" >> .env
	@echo "MINIO_SECRET_KEY=XPdhQgldd9GsAaBUoJoOvemGxP5JBrADToQqPupa" >> .env
	@echo "" >> .env
	@# Docker compose vars
	@echo "LOCALHOST=$(LOCALHOST)" >> .env
	@echo "GATEKEEPER_DISCOVERY_URL=" >> .env
	@echo "GATEKEEPER_CLIENT_ID=" >> .env
	@echo "GATEKEEPER_CLIENT_SECRET=" >> .env
