.PHONY: install dev build start docker-build

IMAGE ?= rudrprasad/crumbcode-web
VERSION ?= dev
PLATFORM ?= linux/amd64
NEXT_PUBLIC_API_BASE_URL ?= __NEXT_PUBLIC_API_BASE_URL__

install:
	npm ci

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

docker-build:
	docker build \
		--platform $(PLATFORM) \
		--build-arg NEXT_PUBLIC_API_BASE_URL=$(NEXT_PUBLIC_API_BASE_URL) \
		-t $(IMAGE):$(VERSION) .
