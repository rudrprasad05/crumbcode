.PHONY: frontend-install frontend-dev frontend-build frontend-docker backend-restore backend-build backend-publish backend-docker docker-build check-version tag-api tag-web tag-release

FRONTEND_DIR ?= ui
BACKEND_DIR ?= server/CrumbCodeBackend
VERSION ?= dev
PLATFORM ?= linux/amd64

frontend-install:
	$(MAKE) -C $(FRONTEND_DIR) install

frontend-dev:
	$(MAKE) -C $(FRONTEND_DIR) dev

frontend-build:
	$(MAKE) -C $(FRONTEND_DIR) build

frontend-docker:
	$(MAKE) -C $(FRONTEND_DIR) docker-build VERSION=$(VERSION) PLATFORM=$(PLATFORM)

backend-restore:
	$(MAKE) -C $(BACKEND_DIR) restore

backend-build:
	$(MAKE) -C $(BACKEND_DIR) build

backend-publish:
	$(MAKE) -C $(BACKEND_DIR) publish

backend-docker:
	$(MAKE) -C $(BACKEND_DIR) docker-build VERSION=$(VERSION) PLATFORM=$(PLATFORM)

docker-build: frontend-docker backend-docker

check-version:
	@test "$(VERSION)" != "dev" || (echo "Set VERSION=x.y.z"; exit 1)

tag-api: check-version
	git tag api/v$(VERSION)

tag-web: check-version
	git tag web/v$(VERSION)

tag-release: check-version
	git tag v$(VERSION)
