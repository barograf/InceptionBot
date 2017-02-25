#!/usr/bin/make -f
include .env

ifndef HUBOT_SLACK_TOKEN
$(error HUBOT_SLACK_TOKEN is undefined)
endif

ifndef HUBOT_VERSION
$(error HUBOT_VERSION is undefined)
endif

ifndef OPENCPU_VERSION
$(error OPENCPU_VERSION is undefined)
endif

ifndef CAMERA_VERSION
$(error CAMERA_VERSION is undefined)
endif

.PHONY: build_opencpu
build_opencpu:
	docker-compose -f docker-compose.devops.yml build opencpu

.PHONY: build_hubot
build_hubot:
	docker-compose -f docker-compose.devops.yml build hubot

.PHONY: build_camera
build_camera:
	docker-compose -f docker-compose.devops.yml build camera

.PHONY: build
build:
	make build_opencpu
	make build_hubot
	make build_camera

.PHONY: start
start:
	docker-compose up -d

.PHONY: stop
stop:
	docker-compose stop

.PHONY: down
down:
	docker-compose down --remove-orphans
