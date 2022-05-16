build-local:
	docker build -t nestjs-base-template:local -f ./deployments/docker/Dockerfile .

build-production:
	docker build -t nestjs-base-template:production -f production.Dockerfile .

start:
	docker-compose up -d

stop:
	docker-compose stop

down:
	docker-compose down

logs:
	docker-compose logs -f nestjs-base-template
