build-local:
	docker build -t nestjs-base-template:local -f ./deployments/docker/Dockerfile .

build-production:
	docker build -t nestjs-base-template:production -f production.Dockerfile .

up:
	docker-compose up -d

stop:
	docker-compose stop

start:
	docker-compose start

down:
	docker-compose down

logs:
	docker logs -f nestjs-base-template
